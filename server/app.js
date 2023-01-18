const connectDb = require("./config/database");
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const uploadRouter = require("./routes/uploader");
const displayRouter = require("./routes/show");
const downloadRouter = require("./routes/download");
const mailRouter = require("./routes/mail");
const ErrorHandler = require("./error/error");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  })
);
connectDb();
app.use(express.static('public'));
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use("/api/files", uploadRouter);
app.use("/files", displayRouter);
app.use("/files/download",downloadRouter);
app.use("/file",mailRouter)

app.use((err,req, res, next) => {
  if (err instanceof ErrorHandler ) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
