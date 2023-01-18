const express = require("express");
const router = express.Router();
const File = require("../modal/file");
const dotenv = require("dotenv");
const ErrorHandler = require("../error/error");
const path = require("path");
dotenv.config();
router.get("/:uuid", async(req, res,next) => {
  try {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
      return res.render('download',{error: next(ErrorHandler.linkError())});
    }
    return res.render('download',
      {
      uuid: file.uuid,
      filename: file.filename,
      fileSize: file.size,
      download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    }
    );
  }
   catch (err) {
    next(ErrorHandler.uncaughtError(err.message));
  }
});

    
module.exports = router;
