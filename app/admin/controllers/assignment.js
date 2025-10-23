const { query } = require("../../../database/connction/query");

const get_assignment = async (req, res, next) => {
    try {
        const assignments = await query('SELECT * FROM `vw_assignments`;');

        res.render('./admin/assignment', {
            materials: assignments
        });
    } catch (e) {
        next(e);
    }
}

const add_assignment = async (req, res, next) => {
    try {
        const {title, description} = req.body;

        if (req.lfile == '/') return res.redirect(`/@admin/assignment?error=true&message=При загрузке файлов произошла ошибка.`);
        
        const { doc } = req;

        const result = await query('INSERT INTO assignments(title, description, file_path) VALUES (?,?,?)',
            [title, description, doc]
        );

        if (result.affectedRows) return res.redirect(`/@admin/assignment`);

        res.redirect('/@admin/assignment?error=true&message=Возникла ошибка при добавлении нового документа. Пожалуйста, дважды проверьте поля')
    } catch (e) {
        next(e);
    }
}


// update item
const update_assignment = async (req, res, next) => {
    try{
        const {id, title, description} = req.body;
        
        const {doc} = req;

        const result = await query('call usp_update_assignment(?,?,?,?)',
                [id, title, description, doc]
        );

        if (result.affectedRows) return res.redirect(`/@admin/assignment`);

        res.redirect(`/@admin/assignment?error=true&message=Во время обновления нового документа произошла ошибка. Пожалуйста, дважды проверьте поля`)
    }
    catch(err){
        next(err)
    } 
}

const delete_assignment = async (req, res, next) => {
    try{
        const {id} = req.params;

        const result = await query("DELETE FROM `assignments` WHERE `id` = ?", [id]);

        if (result.affectedRows) return res.redirect(`/@admin/assignment`);
        
        res.redirect('/@admin/assignment?error=true&message=Ошибка при удалении, проверьте данные и попробуйте снова.')
    }catch(err){
        next(err)
    }
}

module.exports = {
    get_assignment, add_assignment, update_assignment, delete_assignment
}