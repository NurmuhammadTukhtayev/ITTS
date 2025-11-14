const { query } = require('../../../database/connction/query');

// get about
const get_about = async (req, res, next) => {
    try {

        const [documents, materials] = await Promise.all([
            query("SELECT * FROM `documents`;"),
            query("SELECT m.* FROM smart_path.learning_materials m left join learning_material_categories mc on mc.id = m.category_id;")
        ]);

        res.render('./shared/about', {
            copyrightYear: res.locals.copyrightYear,
            learning_material_categories: res.locals.learning_material_categories,
            documents, materials, title: "О курсе"
        });

    } catch (e) {
        next(e);
    }
}

module.exports = { get_about };
