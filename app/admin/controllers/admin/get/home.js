const {query} = require("../../../../../database/connction/query");
module.exports = async (req, res, next)=>{
    try{
        
        res.render('./admin/home', {})
    }catch(err){
        next(err)
    }
}