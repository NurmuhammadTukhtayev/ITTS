const {query} = require('../../../database/connction/query');

module.exports = async (req, res) => {
    const currentYear = new Date().getFullYear(); 

    let learning_material_categories = await query("SELECT * FROM smart_path.learning_material_categories;");
    let blogs = await query("SELECT id, title, substring(content, 1, 300) as content, author, image_url, DATE_FORMAT(created_at, '%M %e, %Y') AS published_on FROM smart_path.blog_posts order by created_at desc limit 3;");

    res.render('./shared/index', { copyrightYear: currentYear, learning_material_categories, blogs });
};
