const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    try{
        const login = process.env.ADMIN_LOGIN;
        const pwd = process.env.ADMIN_PWD;

        const sha256 = require('sha256');

        if(req.session.userID === sha256(login + '&' + pwd))
            return next()
        // console.log("close users", uid, rid)
        return res.redirect("/@admin/login");
    }catch(e){
        next(e);
    }
}