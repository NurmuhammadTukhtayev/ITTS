const {query} = require('../../../database/connction/query');

module.exports = async (req, res) => {
    const category = req.params.category;
    let learning_material_categories = await query("SELECT * FROM smart_path.learning_material_categories;");
    let media = await query("call usp_handle_media_page(?);", [category]);
    const currentYear = new Date().getFullYear(); 

    // console.log(media)
    
    res.render('./shared/media', { category, copyrightYear: currentYear, learning_material_categories, media:media[0] });
};