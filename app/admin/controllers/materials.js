const {query} = require("../../../database/connction/query");

const material_menu = async (req, res, next)=>{
    try{
        let menu = await query("SELECT * FROM `vw_material_categories`");
               
        res.render('./admin/material_menu', {menu})
    }catch(err){
        next(err)
    }
}

const material_menu_post = async (req, res, next)=>{
    try{
        const {category} = req.body;
        
        const result = await query("INSERT INTO `learning_material_categories`(`category_name`) VALUES (?)", [category]);

        if (result.insertId) return res.redirect('/@admin/materials');

        res.redirect('/@admin/materials?error=true&message=Kategoriyani qo\'shishda xatolik yuz berdi');
    }catch(err){
        next(err)
    }
}

const material_menu_put = async (req, res, next)=>{
    try{
        const {id, category} = req.body;
        console.log(req.method);        
        console.log(req.body);        

        const result = await query("UPDATE `learning_material_categories` SET `category_name` = ?, updated_at = CURDATE() WHERE `id` = ?", [category, id]);

        if (result.affectedRows) return res.redirect('/@admin/materials');

        res.redirect('/@admin/materials?error=true&message=Kategoriyani o\'zgartirishda xatolik yuz berdi');

    }catch(err){
        next(err)
    }
}

const material_menu_delete = async (req, res, next)=>{
    try{
        const {id} = req.params;

        const result = await query("DELETE FROM `learning_material_categories` WHERE `id` = ?", [id]);

        if (result.affectedRows) return res.redirect('/@admin/materials');

        res.redirect('/@admin/materials?error=true&message=Kategoriyani o\'chirishda xatolik yuz berdi');
    }catch(err){
        next(err)
    } 
}

const materials_by_category = async (req, res, next)=>{
    try{
        const category = req.params.category;
        let materials = await query("SELECT * FROM `vw_material_items` WHERE `category_id` = ?", [parseInt(category)]);
                
        res.render('./admin/materials', {materials})
    }catch(err){
        next(err)
    }
}


module.exports = {material_menu, materials_by_category, material_menu_post, material_menu_put, material_menu_delete}