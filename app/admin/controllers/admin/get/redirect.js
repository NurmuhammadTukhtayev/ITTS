module.exports = async (req, res, next)=>{
    try{
        res.redirect('/@admin/home')
    }catch(err){
        next(err)
    }
}