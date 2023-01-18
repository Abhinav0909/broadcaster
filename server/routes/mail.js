const express = require("express");
const router = express.Router();
const ErrorHandler = require('../error/error');
const File = require('../modal/file');
const sendMail = require("../services/emailServices");
const dotenv = require("dotenv");
dotenv.config();
router.post('/send',async(req,res,next)=>{
    const {uuid,sender,receiver} = req.body;
    if(!uuid || !sender || !receiver){
        return next(ErrorHandler.validationError());
    }
    const file = await File.findOne({uuid:uuid});
    if(file.sender){
        return next(ErrorHandler.sentError());
    }
    file.sender = sender;
    file.receiver = receiver;
    await file.save();

    sendMail({
        from:sender,
        to:receiver,
        subject:'File shared',
        text:'File sharing app',
        html:require("../services/emailTemplate")({
            emailFrom:sender,
            downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size:parseInt(file.size/1000) + 'KB',
            expires:'24 hours' 
        })
    })

    return res.send({success:true});
})
module.exports = router;