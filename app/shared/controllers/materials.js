const { query } = require('../../../database/connction/query');

module.exports = async (req, res) => {
    try {
        const category = req.params.category;

        // check if category exists
        const categoryExists = await query("SELECT * FROM smart_path.learning_material_categories WHERE id = ?;", [category]);
        if (categoryExists.length === 0) {
            return res.status(404).render('./shared/error', { learning_material_categories: res.locals.learning_material_categories, copyrightYear: res.locals.copyrightYear });
        }

        // get all categories and materials in the category
        let materials = await query("SELECT m.* FROM smart_path.learning_materials m left join learning_material_categories mc on mc.id = m.category_id WHERE category_id = ?;", [category]);

        res.render('./shared/materials', { 
            copyrightYear: res.locals.copyrightYear, 
            learning_material_categories: res.locals.learning_material_categories,
            category: categoryExists[0].category_name, 
            materials 
        });
    } catch (e) {
        next(e);
    }
}