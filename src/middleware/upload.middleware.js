import multer from "multer";

const storage = multer.memoryStorage();
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/svg",
  "image/avif",
];
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("only image files are allowed!"), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

export default upload;
