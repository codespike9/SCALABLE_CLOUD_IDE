const { findOneAndUpdate, insertOne, findOne } = require('../functions/mongodbFunction');
const MongoClient = require('../mongoDbClient');
// const db = MongoClient.db("CLOUD_IDE_SERVER");
// const collection1 = db.collection("PROGRAMMING_SERVICE");

const findContainer = async (email) => {
    try {
        
        const container = await findOne("CLOUD_IDE_SERVER","PROGRAMMING_SERVICE",{ email:email })
        if(!container)
            return false;
        return container;
    } catch (error) {
        console.error(error);
    }
}

const addContainerDetails = async(container_id, user_id, email) => {
    try {
        
        const document = {
            "container_id":container_id,
            "user_id": user_id,
            "email": email
        }
        const user = await insertOne("CLOUD_IDE_SERVER","PROGRAMMING_SERVICE",document);

        if(!user)
            return false;
        return user;
    } catch (error) {
        console.error(error);
        return false        
    }
}
module.exports = { findContainer, addContainerDetails }