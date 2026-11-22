const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, process.env.UPLOAD_DIR || 'uploads'),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname).toLowerCase()}`)
});
const types = new Set(['image/jpeg', 'image/png', 'image/webp']);
module.exports = multer({
  storage, limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => types.has(file.mimetype) ? cb(null, true) : cb(new Error('Only JPG, PNG and WEBP images are allowed'))
});
