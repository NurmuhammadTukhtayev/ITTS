const {query} = require('../../../database/connction/query');

module.exports = async (req, res) => {
    const category = req.params.category;
    let learning_material_categories = await query("SELECT * FROM smart_path.learning_material_categories;");
    let materials = await query("SELECT m.* FROM smart_path.learning_materials m left join learning_material_categories mc on mc.id = m.category_id WHERE category_name = ?;", [category]);
    const currentYear = new Date().getFullYear(); 
    
    res.render('./shared/materials', { category, copyrightYear: currentYear, learning_material_categories, materials });
}