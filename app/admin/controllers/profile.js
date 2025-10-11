const {query} = require("../../../database/connction/query");

// get profile info 
const get_profile = async (req, res, next)=>{
    try{
        const profile_info = await query('select * from profile_meta');
        
        res.render('./admin/profile', {
            profile_meta:profile_info[0]
        })
    }catch(err){
        next(err)
    }
}

// post change profile
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
        next(e);
    }
}

module.exports = {
    change_profile, get_profile
};
