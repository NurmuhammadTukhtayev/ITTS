const { query } = require('../../../database/connction/query');

// get about
const get_assignment = async (req, res, next) => {
    try {

        const [documents, materials] = await Promise.all([
            query("SELECT * FROM `documents`;"),
            query("SELECT m.* FROM smart_path.learning_materials m left join learning_material_categories mc on mc.id = m.category_id;")
        ]);

        res.render('./shared/assignment', {
            copyrightYear: res.locals.copyrightYear,
            learning_material_categories: res.locals.learning_material_categories,
            documents, materials
        });

    } catch (e) {
        next(e);
    }
}

module.exports = { get_assignment };
