const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');

const app=express();

const userRouter=require('./routes/userRouter');

app.use(cors({
    origin:'*',
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api',userRouter);

module.exports=app;