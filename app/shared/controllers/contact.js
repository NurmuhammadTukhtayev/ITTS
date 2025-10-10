const { query } = require('../../../database/connction/query');

module.exports = async (req, res) => {
    const blog_id = req.params.blog_id;
    const currentYear = new Date().getFullYear();
    let learning_material_categories = await query("SELECT * FROM smart_path.learning_material_categories;");
    let profile_meta = await query('SELECT * FROM profile_meta');
    profile_meta = profile_meta[0];
    console.log(profile_meta)

    res.render('shared/contact', {
        title: "Aloqa",
        learning_material_categories,
        copyrightYear:currentYear, 
        profile_meta
    });
}