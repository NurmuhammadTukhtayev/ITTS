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
            let mimi = fileNameParts[fileNameParts.length - 1];

            if (image.size > 10000000) {
                console.log("File is big");
                req.image = image
            }
            // mv()  to save
            image.mv(path.join(__dirname, `../../../public/uploads/img/${imageName}.${mimi}`), async(err) => {
            })

            req.image = imageName + '.' + mimi
            // return next()
        }
        
        if(req.files && req.files.doc){
            let filePath = 'docs'

            if (!fs.existsSync(path.join(__dirname, `../../../public/uploads/${filePath}/`))){
                fs.mkdirSync(path.join(__dirname, `../../../public/uploads/${filePath}/`),{ recursive: true });
            }

            let fileNameParts = req.files.doc.name.split(".");
            let mimi = fileNameParts[fileNameParts.length - 1];

            let doc = req.files.doc
            let docName = req.files.doc.md5 + '.' + mimi

            if(doc.size > 10000000 || doc.size > 10000000){
                console.log("File is big");
                req.lfile = "/"
                return next()
            }

            doc.mv(path.join(__dirname, `../../../public/uploads/${filePath}/${docName}`), async (err)=>{
                if(err) {
                    req.doc = '/'
                    console.log('line 43\n\n',err)
                    return next()
                }
            })

            req.doc = docName
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