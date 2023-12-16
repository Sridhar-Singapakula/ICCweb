const router = require("express").Router();
const multer = require("multer"); // Middleware for handling file uploads
const path = require("path");
// Configure multer to store uploaded files in a specific directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Create a directory named "uploads" in your project
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Rename the file with a unique timestamp
    },
  });

const upload = multer({ storage: storage });
// Serve uploaded images from the "uploads" directory


router.post("/upload", upload.single("file"), (req, res) => {
    console.log("hello")
    if (req.file) {
      // File was uploaded successfully
     
      const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
      res.send({ success: true, imageUrl });
    } else {
      // File upload failed
      res.send({ success: false, error: "File upload failed." });
    }
  });


 module.exports = router;