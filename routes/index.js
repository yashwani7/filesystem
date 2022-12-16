var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require("fs");


/* GET home page. */
router.get('/', function (req, res, next) {
  const files = fs.readdirSync(path.join(__dirname, "..", "public", "FileSystem")
  );
  res.render('index', { files, filedata: null, filename: null });
});

router.post('/create', function (req, res, next) {
  const filename = req.body.filename;
  fs.writeFileSync(
    path.join(__dirname, "..", "public", "FileSystem", filename),
    "//start writing from here "
  );
  res.redirect("/file/" + filename); //redirect hamesha get post pe hotta hai
});

// Redirecting and deleting route 
router.get('/delete/:filename', function (req, res, next) {
  const filename = req.params.filename;
  fs.unlinkSync(
    path.join(__dirname, "..", "public", "FileSystem", filename),
    "//start writing from here "
  );
  res.redirect("/");
});
// Route to see the data 
router.get('/file/:filename', function (req, res, next) {
  const files = fs.readdirSync(path.join(__dirname, "..", "public", "FileSystem")
  );
  const filename = req.params.filename;
  const filedata = fs.readFileSync(

    path.join(__dirname, "..", "public", "FileSystem", filename),
    "utf-8"

  );
  res.render("index", { filedata, files, filename });
});
router.post('/update/:filename', function (req, res, next) {
  const filename = req.params.filename;
  fs.readFileSync(

    path.join(__dirname, "..", "public", "FileSystem", filename),
    res.redirect("/file/" + filename)

  );
});

module.exports = router;
