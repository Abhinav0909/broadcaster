const express = require('express');
const ErrorHandler = require('../error/error');
const router = express.Router();
const File = require("../modal/file");
router.get("/:uuid",async(req,res,next)=>{
    const file = await File.findOne({uuid:req.params.uuid})
    if(!file){
        return res.render('download',{error:next(ErrorHandler.linkError())})
    }
    const filePath = `${__dirname}/../${file.path}`
    res.download(filePath);
})
module.exports = router;