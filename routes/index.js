var express = require("express");
var router = express.Router();

const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const uniqid = require("uniqid");

router.post("/", async (req, res) => {
  console.log(req.files.photoFromFront);
  const photoPath = `./tmp/${uniqid()}.jpg`;
  const resultMove = await req.files.photoFromFront.mv(photoPath);

  if (!resultMove) {
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
    res.json({ result: true, url: resultCloudinary.secure_url });
    console.log(resultCloudinary);
  } else {
    res.json({ result: false, error: resultMove });
    fs.unlinkSync(photoPath);
  }
});

module.exports = router;
