const {query} = require("../../../database/connction/query");

const get_media = async (req, res, next) => {
    try {
        const media = await query("SELECT * FROM vw_media");
        
        res.render('admin/media', {
            materials: media,
        });
    } catch (e) {
        next(e);
    }
}

const post_media = async (req, res, next) => {
    try {
        const { title, file_type, video_url } = req.body;

        // check for file
        if (req.lfile == '/'){
            return res.redirect('/@admin/media?error=true&message=Неверный тип файла')
        }

        let result;
        if (file_type === 'video')
            result = await query("INSERT INTO media (title, file_type, video_url, image_url) VALUES (?, ?, ?, ?)", 
                    [title, file_type, video_url, req.image]);
        else if (file_type === 'document')
            result = await query("INSERT INTO media (title, file_type, file_path, image_url) VALUES (?, ?, ?, ?)",
                    [title, file_type, req.doc, req.image]);
        else
            res.redirect('/@admin/media?error=true&message=Неверный тип файла');

        if (!result.affectedRows){
            console.log('Error inserting media:', result);
            return res.redirect('/@admin/media?error=true&message=Ошибка при добавлении медиа');
        }
            
        res.redirect('/@admin/media');
    }
    catch (e) {
        next(e);
    }
}

const get_edit_media = async (req, res, next) => {
    try {
        const { id } = req.params;

        const media = await query("SELECT * FROM vw_media WHERE id = ?", [id]);

        if (media.length === 0) {
            return res.redirect('/@admin/media?error=true&message=Медиа не найдено');
        }

        res.render('admin/edit_media', {
            item: media[0],
        });
    } catch (e) {
        next(e);
    }
}

const update_media = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, file_type, video_url } = req.body;

        // check for file
        if (req.lfile == '/'){
            return res.redirect('/@admin/media?error=true&message=Неверный тип файла')
        }

        const result = await query("call usp_update_media(?, ?, ?, ?, ?, ?)",
            [id, title, file_type, video_url || null, req.doc || null, req.image || null]);

        if (!result.affectedRows) {
            console.log('Error updating media:', result);
            return res.redirect(`/@admin/media/edit/${id}?error=true&message=Ошибка при обновлении медиа`);
        }

        res.redirect('/@admin/media');
    } catch (e) {
        next(e);
    }
}

const delete_media = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await query("DELETE FROM media WHERE id = ?", [id]);

        if (!result.affectedRows) {
            console.log('Error deleting media:', result);
            return res.status(500).json({ success: false, message: 'Ошибка при удалении медиа' });
        }

        res.redirect('/@admin/media');
    } catch (e) {
        next(e);
    }
}

module.exports = {
    get_media, post_media, get_edit_media, update_media, delete_media
}