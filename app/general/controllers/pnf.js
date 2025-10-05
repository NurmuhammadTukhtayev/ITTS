const {query} = require('../../../database/connction/query');

module.exports = async (req, res) => {
    let learning_material_categories = await query("SELECT * FROM smart_path.learning_material_categories;");
    const currentYear = new Date().getFullYear(); 

    res.render('./shared/error', { copyrightYear: currentYear, learning_material_categories });
}