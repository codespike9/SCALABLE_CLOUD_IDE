const express=require('express');
const { getFiles,getFileContent } = require('../controllers/fileControllers');
const router=express.Router();

router.get('/files/content',getFileContent);
router.get('/files',getFiles);

module.exports=router