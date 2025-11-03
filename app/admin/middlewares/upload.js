const fs = require("fs");
const path = require("path");
let upload = (req, res, next) => {
    try {
        // if there images
        if(req.files && req.files.image){
            if(!fs.existsSync(path.join(__dirname, `../../../public/uploads/img/`))){                
                fs.mkdirSync(path.join(__dirname, `../../../public/uploads/img/`),{ recursive: true });
            }
            
            let imageName = req.files.image.md5;
            let image = req.files.image;
            let fileNameParts = req.files.image.name.split(".");
            let ext = fileNameParts[fileNameParts.length - 1].toLowerCase();

            // Allow only image extensions
            const allowedImageExts = ["jpg", "jpeg", "png", "gif", "webp"];
            if (!allowedImageExts.includes(ext)) {
                console.log("Invalid image format");
                req.lfile = '/';
                return next();
            }

            if (image.size > 10000000) {
                console.log("File is big");
                req.lfile = '/';
                return next();
            }
            // mv()  to save
            image.mv(path.join(__dirname, `../../../public/uploads/img/${imageName}.${ext}`), async(err) => {
            })

            req.image = imageName + '.' + ext
            // return next()
        }
        
        if(req.files && req.files.doc){
            let filePath = 'docs'

            if (!fs.existsSync(path.join(__dirname, `../../../public/uploads/${filePath}/`))){
                fs.mkdirSync(path.join(__dirname, `../../../public/uploads/${filePath}/`),{ recursive: true });
            }

            let fileNameParts = req.files.doc.name.split(".");
            let ext = fileNameParts[fileNameParts.length - 1].toLowerCase();

            // Allow only PDF
            if (ext !== "pdf" && ext !== "pptx" && ext !== "ppt") {
                console.log("Only PDF files are allowed");
                req.lfile = "/";
                return next();
            }

            let doc = req.files.doc
            let docName = req.files.doc.md5 + '.' + ext

            if(doc.size > 10000000 || doc.size > 10000000){
                console.log("File is big");
                req.lfile = "/"
                return next()
            }

            doc.mv(path.join(__dirname, `../../../public/uploads/${filePath}/${docName}`), async (err)=>{
                if(err) {
                    req.lfile = '/'
                    console.log('line 43\n\n',err)
                    return next()
                }
            })

            req.doc = docName
        }
        if(req.files && req.files.docx){
            let filePath = 'tests'

            if (!fs.existsSync(path.join(__dirname, `../../../public/uploads/${filePath}/`))){
                fs.mkdirSync(path.join(__dirname, `../../../public/uploads/${filePath}/`),{ recursive: true });
            }

            let fileNameParts = req.files.docx.name.split(".");
            let ext = fileNameParts[fileNameParts.length - 1].toLowerCase();

            // Allow only docx
            if (ext !== "docx") {
                console.log("Only docx files are allowed");
                req.lfile = "/";
                return next();
            }

            let doc = req.files.docx
            let docName = req.files.docx.md5 + '.' + ext

            if(doc.size > 10000000 || doc.size > 10000000){
                console.log("File is big");
                req.lfile = "/"
                return next()
            }

            doc.mv(path.join(__dirname, `../../../public/uploads/${filePath}/${docName}`), async (err)=>{
                if(err) {
                    req.lfile = '/'
                    console.log('line 102\n\n',err)
                    return next()
                }
            })

            req.docx = docName
        }
        return next()
    } catch (err) {
        // console.log("Upload error in line 24");
        console.log(err);
        req.lfile = "/";
        return next()
    }
}

module.exports = upload