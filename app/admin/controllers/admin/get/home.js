const {query} = require("../../../../../database/connction/query");
module.exports = async (req, res, next)=>{
    try{
        const profile_info = await query('select * from profile_meta');
        
        res.render('./admin/profile', {
            profile_meta:profile_info[0]
        })
    }catch(err){
        next(err)
    }
}