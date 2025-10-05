const express = require('express');
const app = express.Router();
const {query} = require('../../../database/connction/query');

app.get('/', require('../controllers/blogs'));

app.get('/:blog_id', async (req, res) => {
    const blog_id = req.params.blog_id;
    const currentYear = new Date().getFullYear();
    let learning_material_categories = await query("SELECT * FROM smart_path.learning_material_categories;");
    
    let blog = (await query("SELECT id, title, content, author, image_url, DATE_FORMAT(published_at, '%M %e, %Y') AS published_on FROM smart_path.blog_posts WHERE id = ?;", [blog_id]))[0]
    let blogs = await query("SELECT id, title, substring(content, 1, 300) as content, author, image_url, DATE_FORMAT(published_at, '%M %e, %Y') AS published_on FROM smart_path.blog_posts order by published_at desc limit 5;");
    

    res.render('./shared/blog_details', { copyrightYear: currentYear, learning_material_categories, blog, blogs });
});

module.exports = app;
