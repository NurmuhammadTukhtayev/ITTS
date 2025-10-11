const { query } = require('../../../database/connction/query');

module.exports = async (req, res, next) => {
    try {
        let profile_meta = await query('SELECT * FROM profile_meta');
        profile_meta = profile_meta[0];
        
        // if there is no data 
        if(!profile_meta) return res.render('./shared/error', {
            copyrightYear: res.locals.copyrightYear, 
            learning_material_categories: res.locals.learning_material_categories,
        });

        // render contact page
        res.render('shared/contact', {
            copyrightYear: res.locals.copyrightYear, 
            learning_material_categories: res.locals.learning_material_categories,
            profile_meta
        });
        
    }catch(e){
        next(e);
    }
}