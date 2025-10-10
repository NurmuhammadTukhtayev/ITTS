const {query} = require("../../../database/connction/query");

const change_profile = async (req, res, next) => {
    try{
        const {id, first_name, last_name, job, about_me,
            experience_years, phone, email, telegram
        } = req.body;

        const result = await query("call usp_update_profile(?,?,?,?,?,?,?,?,?,?)",
            [id, first_name, last_name, job, about_me, experience_years, phone, email, telegram, req.image]
        );

        if (!result.affectedRows) {
            console.log('Error updating media:', result);
            return res.redirect(`/@admin/home?error=true&message=Ошибка при обновлении`);
        }

        res.redirect('/@admin/');
    }
    catch(e){
        console.log(e);
        res.redirect(`/@admin/home?error=true&message=Ошибка при обновлении`);
    }
}

module.exports = {
    change_profile
};
