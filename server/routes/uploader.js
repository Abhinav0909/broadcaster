const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const File = require("../modal/file");
const { v4: uuidv4 } = require("uuid");
const ErrorHandler = require("../error/error");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
let upload = multer({ storage, limit: { fileSize: 1000000 * 100 } }).single(
  "myfile"
);
router.post("/", (req, res,next) => {
  upload(req, res,async (err) => {
    if (!req.file) {
      return next(ErrorHandler.validationError());
    }
    if (err) {
      return next(ErrorHandler.serverError());
    }

    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      uuid: uuidv4(),
    });
    const response = await file.save();

    res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
  });
});
module.exports = router;
