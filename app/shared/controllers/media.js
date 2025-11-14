const { query } = require('../../../database/connction/query');

module.exports = async (req, res, next) => {
    try {
        const category = req.params.category;
        let title;
        let media = await query("call usp_handle_media_page(?);", [category]);
        if(category == 'videos') title = "Видеоуроки"
        else title = "Инструкции"

        res.render('./shared/media', { 
            copyrightYear: res.locals.copyrightYear, 
            learning_material_categories: res.locals.learning_material_categories,
            category, 
            media: media[0], title
        });
    } catch (e) {
        next(e);
    }
};