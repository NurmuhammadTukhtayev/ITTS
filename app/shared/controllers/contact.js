const { query } = require('../../../database/connction/query');

module.exports = async (req, res) => {
    const blog_id = req.params.blog_id;
    const currentYear = new Date().getFullYear();
    let learning_material_categories = await query("SELECT * FROM smart_path.learning_material_categories;");

    res.render('shared/contact', {
        title: "Aloqa",
        learning_material_categories,
        copyrightYear:currentYear
    });
}