const dotenv = require('dotenv');
dotenv.config();

// sign in
const get_sign_in = async (req, res, next) => {
    try{
        res.render('./admin/login')
    }catch(err){
        next(err)
    }
}

// sing in POST
const sign_in = async (req, res, next)=>{
    try{
        const sha256 = require('sha256')
        const { username, password } = req.body;
        
        const login = process.env.ADMIN_LOGIN;
        const pwd = process.env.ADMIN_PWD;        

        if(username === login && password === pwd){
            req.session.userID = sha256(login + '&' + pwd)
            return res.redirect('/@admin/home')
        }

        res.redirect('/@admin/login?error=true&msg=Логин или пароль неверны')

    }catch(err){
        next(err)
    }
}

// sign out
const sign_out = async (req, res, next)=>{
    try{
        req.session.destroy()

        res.redirect('/')
    }catch(err){
        next(err)
    }
}

module.exports = {
    get_sign_in, sign_out, sign_in
}