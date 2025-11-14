const { query } = require('../../../database/connction/query');

module.exports = async (req, res, next) => {
    try {
        let blogs = await query("SELECT id, title, substring(content, 1, 300) as content, author, image_url, DATE_FORMAT(created_at, '%M %e, %Y') AS published_on FROM smart_path.blog_posts order by created_at desc limit 6;");
        let profile_meta = await query('SELECT * FROM profile_meta');
        profile_meta = profile_meta[0];
        
        // if there is no data 
        // if(!profile_meta) return res.render('./shared/error', {
        //     copyrightYear: res.locals.copyrightYear, 
        //     learning_material_categories: res.locals.learning_material_categories,
        // });

        res.render('./shared/index', { 
            copyrightYear: res.locals.copyrightYear, 
            learning_material_categories: res.locals.learning_material_categories,
            blogs, profile_meta, title: "Платформа ITTS"
        });
    } catch (e) {
        next(e);
    }
};
