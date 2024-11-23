const express=require('express');
const cors=require('cors');

const app=express();

const programmingRouter = require('./routes/programmingRouter');

app.use(cors({
    origin:'*',
    credentials:true
}));

app.use(express.json());

app.use('/api',programmingRouter);

module.exports=app;