import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

export default {
    storage: multerS3({
        s3: new aws.S3(),
        bucket: 'patrimonios-gcm',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null, `uploads/${fileName}`);
        },
        
    })
}

/*
//import multer from 'multer';
//import path from 'path';

export default {
  local: {
        storage: multer.diskStorage({
            destination: path.join(__dirname, '..', '..', 'uploads'),
            filename: (request, file, cb) => {
                const fileName = `${Date.now()}-${file.originalname}`;

                cb(null, fileName);
            },
        }),
    },
}
*/