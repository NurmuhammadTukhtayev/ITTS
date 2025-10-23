const { query } = require('../../../database/connction/query');

// get about
const get_assignment = async (req, res, next) => {
    try {

        const assignments = await query("SELECT * FROM `vw_assignments`;");

        res.render('./shared/assignment', {
            copyrightYear: res.locals.copyrightYear,
            learning_material_categories: res.locals.learning_material_categories,
            assignments
        });

    } catch (e) {
        next(e);
    }
}

module.exports = { get_assignment };
