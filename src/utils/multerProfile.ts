import multer from 'multer';
import path from 'path';

export const multerProfile = () => {
  const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const fileFormat = ['.jpg', '.jpeg', '.png'];
      const fileExtension = path.extname(file.originalname);

      if (fileFormat.includes(fileExtension)) return cb(null, true);
      return cb(null, false);
    },
  }).single('profilePicture');

  return { upload };
};
