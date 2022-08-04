import jwtDecode from 'jwt-decode';

import multer from 'multer';
import path from 'path';

export const UploadKmlFolder = path.join(__dirname, '..', 'uploads', 'kml');
export const UploadPdfFolder = path.join(__dirname, '..', 'uploads', 'pdf');

export const MulterKml = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, UploadKmlFolder);
    },
    filename: (req, _file, callback) => {
      const authorization = req.headers.authorization || '';
      const {
        user: { _id },
      } = jwtDecode(authorization) as { user: { _id: string } };
      callback(null, `${_id}.kml`);
    },
  }),
});

export const MulterPDF = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, UploadPdfFolder);
    },
    filename: (req, _file, callback) => {
      const authorization = req.headers.authorization || '';
      const {
        user: { _id },
      } = jwtDecode(authorization) as { user: { _id: string } };
      callback(null, `${_id}.pdf`);
    },
  }),
});

export const MulterFile = multer({
  storage: multer.memoryStorage(),
});
