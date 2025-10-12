const page_not_found = async (req, res, next) => {
    try{
        res.render('./admin/error', {
            image_url: res.locals.image_url,
            copyrightYear: res.locals.copyrightYear
        });
    }catch(e){
        next(e);
    }
}

const redirect_to_home = async (req, res, next)=>{
    try{
        res.redirect('/@admin/home')
    }catch(err){
        next(err)
    }
}

module.exports = {
    page_not_found, redirect_to_home
}