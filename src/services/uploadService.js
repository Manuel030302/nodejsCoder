import multer from "multer";
import getDirname from "../utils.js";

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        return callback(null,`${getDirname()}/public/img`);
    },
    filename:function(req,file,callback){
        return callback(null,`${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage});

export default uploader;