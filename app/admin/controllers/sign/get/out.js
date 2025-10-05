module.exports = async (req, res, next)=>{
    try{
        req.session.destroy()

        res.redirect('/')
    }catch(err){
        next(err)
    }
}