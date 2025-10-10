const {query} = require("../../../database/connction/query");

const get_blogs = async (req, res, next) => {
    try {
        const blogs = await query('SELECT * FROM vw_blogs;');

        // if (blogs.length === 0) return res.redirect('/@admin/');
        
        res.render('./admin/blogs', {materials: blogs});
    }catch(e){
        console.log(e);
        res.redirect('/@admin/blogs/');
    }
}

const get_create_blogs = async (req, res, next) => {
    try{
        res.render('./admin/edit_blogs', {item:{}});
    }catch(e){
        console.log(e);
        res.redirect('/@admin/blogs/create?error=true&message=' + e);
    }
}

const create_blog = async (req, res, next) => {
    try{
        const {title, author, content} = req.body;
        const result = await query('INSERT INTO smart_path.blog_posts(title, content, author, image_url) VALUES(?,?,?,?)',
            [title, content, author, req.image]);

        if (!result.affectedRows) return res.redirect('/@admin/blogs/create?error=true&message=Не удалось сохранить контент, пожалуйста, проверьте его ещё раз')

        res.redirect('/@admin/blogs')
    }catch(e){
        console.log(e);
        res.redirect('/@admin/blogs/create?error=true&message=' + e);
    }
}

const get_edit_blog = async (req, res, next) => {
    try{
        const blog = await query('select * from smart_path.blog_posts where id = ?',
            [req.params.id]
        )

        if (blog.length === 0) return res.render('./admin/error')
        
        // console.log(blog[0])
        res.render('./admin/edit_blogs', {item:blog[0], useMethodOverride:''});
    }catch(e){
        console.log(e);
        res.redirect(`/@admin/blogs/edit/${req.params.id}?error=true&message=${e}`);
    }
}

const edit_blog = async (req, res, next) => {
    try{
        const {title, author, content} = req.body;

        const result = await query('call usp_update_blog(?, ?, ?, ?, ?)',
            [req.params.id, title, content, author, req.image]
        )
        if (result.err) return res.redirect(`/@admin/blogs/edit/${req.params.id}?error=true&message=${result.errData}`)

        res.redirect(`/@admin/blogs/edit/${req.params.id}`)
    }catch(e){
        console.log(e);
        res.redirect(`/@admin/blogs/edit/${req.params.id}?error=true&message=${e}`);
    }
}

const delete_blog = async (req, res, next) => {
    try{
        const id = req.params.id;
        const result = await query("DELETE FROM `blog_posts` WHERE `id` = ?", [id]);

        if (result.affectedRows) return res.redirect(`/@admin/blogs`);

        res.redirect('/@admin/blogs?error=true&message=Ошибка при удалении, проверьте данные и попробуйте снова.')
    }catch(e){
        console.log(e);
        res.redirect(`/@admin/blogs/edit/${req.params.id}?error=true&message=${e}`);
    }
}

module.exports = {
    get_blogs, get_create_blogs, create_blog, edit_blog, get_edit_blog, delete_blog
}