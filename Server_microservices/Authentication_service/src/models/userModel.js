const bcrypt = require('bcrypt');
const jwtMiddleware=require('../middlewares/jwtMiddleware');
const MongoClient = require('../mongoDbClient');

const db = MongoClient.db("CLOUD_IDE_SERVER");
const collection = db.collection("USER");

const createUser = async (email, name, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await collection.insertOne(
      { email, name, password: hashedPassword },
    );

    const payload={
        id:newUser._id,
        email:email
    }

    const accessToken=jwtMiddleware.generateToken(payload);

    return {newUser: {email: email,name:name }, accessToken};
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};

const comparePassword=async(actualPass,inputPass)=>{
    try {
        const isMatch=await bcrypt.compare(inputPass,actualPass);
        return isMatch;
    } catch (error) {
        throw(error);
    }
}

const loginUser=async(email,password)=>{
    try {
        const userData=await collection.findOne({
            email:email
        })

        if(!userData || !(await comparePassword(userData.password,password))){
            return null;
        }

        const payload={
            id:userData._id,
        }

        const accessToken=jwtMiddleware.generateToken(payload);

        return { userData,accessToken};
    } catch (error) {
        console.error(error);
    }
}

module.exports = {createUser,loginUser};
