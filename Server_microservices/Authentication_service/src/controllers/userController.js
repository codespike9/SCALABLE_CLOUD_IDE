const { createUser,loginUser }=require('../models/userModel');
const {spinContainer}=require('./containerControllers');

const registerUser=async(req,res)=>{
    try {
        const {name,password,email}=req.body;
        const { newUser, accessToken }=await createUser(email,name,password);
        // setTimeout(()=>spinContainer(`container${newUser.id}`,email),2000);
        // spinContainer(`container${newUser.id}`,email);
        return res.status(201).json({message:"User registration is completed.", user:{name:newUser.name,email:newUser.email}, accessToken});
    } catch (error) {
        console.error('Error creating user.');
        return res.status(500).json({message:"Error in registration"});
    }
}

const loginUserHandler=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const authResult=await loginUser(email,password);
        if(authResult){
            const { userData,accessToken}=authResult;
            
            res.cookie('accessToken',accessToken,{
                httpOnly:true,
                maxAge: 3 * 24 * 60 * 60 * 1000,
                sameSite: "strict",
            })
            return res.status(200).json({message:"Login successfull",user:{name:userData.name,email:userData.email}, accessToken});
        }else {
            return res.status(401).json({ error: 'Authentication failed' });
          }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to log in user' });
      }
}


module.exports={ registerUser, loginUserHandler };