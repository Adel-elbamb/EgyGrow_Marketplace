import multer from "multer";
import path from "path";
import fs from "fs";

// 1. Ensure directory exists
const uploadPath = path.join("uploads", "products");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 2. Storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// 3. File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// 4. Multer upload with array support (max 5 files for example)
export const uploadProductImages = multer({
  storage,
  fileFilter,
}).array("images", 5); 
