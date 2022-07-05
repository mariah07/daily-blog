const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/Users");
const postRoute = require("./routes/Posts");
const categoryRoute = require("./routes/Categories");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
dotenv.config();
const cloudinary = require('../api/utils/cloudinary');

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch(err=>console.log(err));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "images");
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      });
      
      const upload = multer({ storage: storage });

      app.post("/api/upload", upload.single("file"), (req, res) => {
        res.status(200).json("File has been uploaded");
      });
      /*
      app.post("/api/upload", upload.single("file"), async (req, res) => {
        try {
            const uploadResponse = await cloudinary.uploader.upload(req.body.data);
            res.status(200).json(uploadResponse);
        } catch (err) {
            res.status(500).json(err);
        }
    });*/

    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/posts", postRoute);
    app.use("/api/categories", categoryRoute);

    app.listen("5000", () => {
        console.log("Backend is running.");
    });