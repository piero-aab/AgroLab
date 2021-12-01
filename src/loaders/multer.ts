import multer from 'multer';
import * as path from 'path';


const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})

function fileFilter (req:any, file:any, callback:any){
  var ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.jfif' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.GIF' 
  && ext !== '.JFIF' ) {
    return callback(new Error('Solo imagenes estan permitidas'))
  }
  callback(null, true)
}

const multerFiles = multer({
  storage: storage,
  fileFilter:fileFilter,
  limits:{ fileSize: 20000000 }, // In bytes: 2000000 bytes = 20 MB
 
}).any();


export default multerFiles;
