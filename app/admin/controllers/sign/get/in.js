module.exports = async (req, res, next) => {
    try{
        res.render('./admin/login')
    }catch(err){
        next(err)
    }
}