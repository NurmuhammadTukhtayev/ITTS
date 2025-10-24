const {query} = require("../../../database/connction/query");

const get_evaluation_posts = async (req, res, next) => {
    try {
        const blogs = await query('SELECT * FROM vw_evaluation;');

        // if (blogs.length === 0) return res.redirect('/@admin/');
        
        res.render('./admin/evaluation', {materials: blogs});
    }catch(e){
        next(e);
    }
}

const get_create_posts = async (req, res, next) => {
    try{
        res.render('./admin/edit_evaluation', {item:{}});
    }catch(e){
        next(e);
    }
}

const create_blog = async (req, res, next) => {
    try{
        const {title, content} = req.body;
        const result = await query('INSERT INTO smart_path.evaluation_posts(title, content, image_url) VALUES(?,?,?)',
            [title, content, req.image]);

        if (!result.affectedRows) return res.redirect('/@admin/evaluation/create?error=true&message=Не удалось сохранить контент, пожалуйста, проверьте его ещё раз')

        res.redirect('/@admin/evaluation')
    }catch(e){
        next(e);
    }
}

const get_edit_blog = async (req, res, next) => {
    try{
        const blog = await query('select * from smart_path.evaluation_posts where id = ?',
            [req.params.id]
        )

        if (blog.length === 0) return res.render('./admin/error')
        
        // console.log(blog[0])
        res.render('./admin/edit_evaluation', {item:blog[0], useMethodOverride:'', deleteActionFromController:''});
    }catch(e){
        next(e);
    }
}

const edit_blog = async (req, res, next) => {
    try{
        const {title, content} = req.body;

        const result = await query('call usp_update_evaluation(?, ?, ?, ?)',
            [req.params.id, title, content, req.image]
        )
        if (result.err) return res.redirect(`/@admin/evaluation/edit/${req.params.id}?error=true&message=${result.errData}`)

        res.redirect(`/@admin/evaluation/edit/${req.params.id}`)
    }catch(e){
        next(e);
    }
}

const delete_blog = async (req, res, next) => {
    try{
        const id = req.params.id;
        const result = await query("DELETE FROM `evaluation_posts` WHERE `id` = ?", [id]);

        if (result.affectedRows) return res.redirect(`/@admin/evaluation`);

        res.redirect('/@admin/evaluation?error=true&message=Ошибка при удалении, проверьте данные и попробуйте снова.')
    }catch(e){
        next(e);
    }
}

module.exports = {
    get_evaluation_posts, get_create_posts,
    create_blog, edit_blog, get_edit_blog, delete_blog
}