const { query } = require("../../../database/connction/query");

const get_documents = async (req, res, next) => {
    try {
        const documents = await query('SELECT * FROM `documents`;');

        res.render('./admin/documents', {
            materials: documents
        });
    } catch (e) {
        next(e);
    }
}

const add_document = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (req.lfile == '/') return res.redirect(`/@admin/documents?error=true&message=При загрузке файлов произошла ошибка.`);

        const { doc } = req;

        const result = await query('INSERT INTO documents(title, description, file_path) VALUES (?,?,?)',
            [title, description, doc]
        );

        if (result.affectedRows) return res.redirect(`/@admin/documents`);

        res.redirect('/@admin/documents?error=true&message=Возникла ошибка при добавлении нового документа. Пожалуйста, дважды проверьте поля')
    } catch (e) {
        next(e);
    }
}

// update item
const update_document = async (req, res, next) => {
    try{
        const {id, title, description} = req.body;
        
        const {doc} = req;

        const result = await query('call usp_update_document(?,?,?,?)',
                [id, title, description, doc]
        );

        if (result.affectedRows) return res.redirect(`/@admin/documents`);

        res.redirect(`/@admin/documents?error=true&message=Во время обновления нового документа произошла ошибка. Пожалуйста, дважды проверьте поля`)
    }
    catch(err){
        next(err)
    } 
}

const delete_document = async (req, res, next) => {
    try{
        const {id} = req.params;

        const result = await query("DELETE FROM `documents` WHERE `id` = ?", [id]);

        if (result.affectedRows) return res.redirect(`/@admin/documents`);
        
        res.redirect('/@admin/documents?error=true&message=Ошибка при удалении, проверьте данные и попробуйте снова.')
    }catch(err){
        next(err)
    }
}

module.exports = {
    get_documents, add_document, update_document, delete_document
}