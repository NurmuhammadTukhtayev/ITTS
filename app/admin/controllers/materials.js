const {query} = require("../../../database/connction/query");

// get material categories
const material_menu = async (req, res, next)=>{
    try{
        let menu = await query("SELECT * FROM `vw_material_categories`");
               
        res.render('./admin/material_menu', {menu})
    }catch(err){
        next(err)
    }
}

// add new material category
const material_menu_post = async (req, res, next)=>{
    try{
        const {category} = req.body;
        console.log(req.body);
        
        
        const result = await query("INSERT INTO `learning_material_categories`(`category_name`) VALUES (?)", [category]);

        if (result.insertId) return res.redirect('/@admin/materials');

        res.redirect('/@admin/materials?error=true&message=Kategoriyani qo\'shishda xatolik yuz berdi');
    }catch(err){
        next(err)
    }
}

// update material category
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

// remove material category
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

// get items by category
const materials_by_category = async (req, res, next)=>{
    try{
        const category = req.params.id;
        let materials = await query("SELECT * FROM `vw_material_items` WHERE `category_id` = ?", [parseInt(category)]);

        // add validation to category to exists
        res.render('./admin/materials', {materials})
    }catch(err){
        next(err)
    }
}

// add new items
const material_post = async (req, res, next) => {
    try{
        const {id, category_id, title, description} = req.body;
        
        if (req.lfile == '/') return res.redirect(`/@admin/materials/${category_id}?error=There is an error during the file upload`);
        
        const {image, doc} = req;

        const result = await query('INSERT INTO learning_materials(title, image_url, description, category_id, file_path) VALUES (?,?,?,?,?)',
                [title, image, description, category_id, doc]
        );

        if (result.affectedRows) return res.redirect('/@admin/materials/1');

        res.redirect('/@admin/materials/${category_id}?error=There is an error during the database process.')
    }catch{

    }
}

module.exports = {
    material_menu, materials_by_category, material_menu_post, material_menu_put, material_menu_delete,
    material_post
}