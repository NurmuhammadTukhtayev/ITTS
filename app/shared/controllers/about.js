const { query } = require('../../../database/connction/query');

// get about
const get_about = async (req, res, next) => {
    try{
        

        res.render('./shared/about', {
            copyrightYear: res.locals.copyrightYear,
            learning_material_categories: res.locals.learning_material_categories
        });
        
    }catch(err){

    }
}

module.exports = {get_about};
