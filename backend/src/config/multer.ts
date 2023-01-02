import multer from 'multer';

import { resolve } from 'node:path';

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {

          const fileName = `${Date.now()}-${file.originalname}`;

          return callback(null, fileName);
        }
      })
    };
  }
};
