import multer from 'multer';
import * as path from 'path';


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req: any, file: any, cb: any) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})

function fileFilter (req:any, file:any, callback:any){
  var ext = path.extname(file.originalname);
  if(ext !== '.png' && ext !== '.jpg' && ext !== '.jfif' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.GIF' 
  && ext !== '.JFIF' ) {
    // req.flash('errors', { msg: 'Usuario suspendido.' });
    return callback(new Error('Solo imagenes estan permitidas'))
  }
  callback(null, true)
}

let multerConfig = multer({storage, fileFilter}).fields([{name: 'profileImage', maxCount: 1}, {name:'coverImage', maxCount: 1}])

export default multerConfig;
