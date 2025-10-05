const fs = require("fs");
const path = require("path");
let upload = (req, res, next) => {
    try {
        // if there photos
        if(req.files && req.files.photos){
            if(!fs.existsSync(path.join(__dirname, `../../../public/upload/gallery/`))){
                fs.mkdirSync(path.join(__dirname, `../../../public/upload/gallery/`),{ recursive: true });
            }
            let photos = []

            if(!Array.isArray(req.files.photos)){
                let imageName = req.files.photos.md5;
                let image = req.files.photos;
                let mimi = image.mimetype.split("/");

                if (image.size > 10000000) {
                    console.log("File is big");
                    req.photos = photos
                }
                // mv()  to save
                image.mv(path.join(__dirname, `../../../public/upload/gallery/${imageName}.${mimi[1]}`), async(err) => {
                })
                photos.push(imageName + "." + mimi[1]);
                req.photos = [imageName + "." + mimi[1]];
                return next();
            }
            for (let i = 0; i < req.files.photos.length; i++) {
                let imageName = req.files.photos[i].md5;
                let sampleFile = req.files.photos[i];
                let mimi = sampleFile.mimetype.split("/");

                if (sampleFile.size > 10000000) {
                    console.log("File is big");
                    req.photos = photos
                }
                // mv()  to save
                sampleFile.mv(path.join(__dirname, `../../../public/upload/gallery/${imageName}.${mimi[1]}`), async(err) => {
                })
                photos.push(imageName + "." + mimi[1])
            }
            req.photos = photos
            return next()
        }else if(req.files && req.files.resultsFile){
            let filePath = 'parings'
            let resultsFileName = req.files.resultsFile.md5;
            if(req.params.rankingID) filePath = 'rankings'

            if (!fs.existsSync(path.join(__dirname, `../../../public/upload/${filePath}/`))){
                fs.mkdirSync(path.join(__dirname, `../../../public/upload/${filePath}/`),{ recursive: true });
            }

            let resultsFile = req.files.resultsFile

            if(resultsFile.size > 10000000 || resultsFile.size > 10000000){
                console.log("File is big");
                req.lfile = "/"
                return next()
            }

            resultsFile.mv(path.join(__dirname, `../../../public/upload/${filePath}/${resultsFileName}.xlsx`), async (err)=>{
                if(err) {
                    req.resultsFile = '/'
                    console.log('line 45\n\n',err)
                    return next()
                }
                req.resultsFile = resultsFileName + '.' + 'xlsx'
                return next()
            })
        }
        else{// else ranking & parings
            // check if folder exists
            if (!fs.existsSync(path.join(__dirname, `../../../public/upload/rankings/`))){
                fs.mkdirSync(path.join(__dirname, `../../../public/upload/rankings/`),{ recursive: true });
                fs.mkdirSync(path.join(__dirname, `../../../public/upload/parings/`), { recursive: true });
            }

            let rankingFileName = req.files.rankingFile.md5;
            let paringFileName = req.files.paringFile.md5;

            let rankingFile = req.files.rankingFile
            let paringFile = req.files.paringFile

            if(rankingFile.size > 10000000 || paringFile.size > 10000000){
                console.log("File is big");
                req.lfile = "/"
                return next()
            }

            rankingFile.mv(path.join(__dirname, `../../../public/upload/rankings/${rankingFileName}.xlsx`), async(err)=>{
                if(err) {
                    req.rankingFile = '/'
                    req.paringFile = '/'
                    console.log(err)
                    return next()
                }
                paringFile.mv(path.join(__dirname, `../../../public/upload/parings/${paringFileName}.xlsx`), async (err)=>{
                    if(err) {
                        req.rankingFile = '/'
                        req.paringFile = '/'
                        console.log('line 45\n\n',err)
                        return next()
                    }
                    req.paringFile = paringFileName + '.' + 'xlsx'
                    req.rankingFile = rankingFileName + '.' + 'xlsx'
                    return next()
                })
            })
        }
    } catch (err) {
        // console.log("Upload error in line 24");
        console.log(err);
        req.lfile = "/";
        return next()
    }
}

module.exports = upload