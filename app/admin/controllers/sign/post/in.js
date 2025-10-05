const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next)=>{
    try{
        const sha256 = require('sha256')
        const { username, password } = req.body;
        
        const login = process.env.ADMIN_LOGIN;
        const pwd = process.env.ADMIN_PWD;        

        if(username === login && password === pwd){
            req.session.userID = sha256(login + '&' + pwd)
            return res.redirect('/@admin/home')
        }

        res.redirect('/@admin/login?msg=Login or password is invalid')

    }catch(err){
        next(err)
    }
}