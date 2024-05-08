const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext); // Rename file
  },
});

// Init imageUpload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB max file size
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("user_photo"); // Field name in the form

// Check file type
const checkFileType = (file, cb) => {
    // Allowed extensions
    const filetypes = /jpeg|jpg|png/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      // If file type is valid, invoke the callback with no error
      cb(null, true);
    } else {
      // If file type is not valid, invoke the callback with an error
      cb(new Error("Please provide jpeg, jpg, png images"));
    }
  };

exports.imageUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // If no file uploaded, skip deleting old image and continue
    if (!req.file) {
      req.imagePath = req.body.old_user_photo;
      return next();
    }
    // If file uploaded successfully, delete the old image if a new one is uploaded
    if (req.file && req.body.old_user_photo) {
      fs.unlink(path.join("uploads", req.body.old_user_photo), (error) => {
        if (error) {
          console.error("Error deleting old image:", error);
        } else {
          console.log("Old image deleted successfully");
        }
      });
    } else {
      console.log("else part");
    }
    // Attach image path to the request object
    req.imagePath = req.file.filename;
    next();
  });
};
