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
        
        const result = await query("INSERT INTO `learning_material_categories`(`category_name`) VALUES (?)", [category]);

        if (result.insertId) return res.redirect('/@admin/materials');

        res.redirect('/@admin/materials?error=true&message=Kategoriyani qo\'shishda xatolik yuz berdi. Iltimos, ma\'lumotlarni tekshirib qayta urinib ko\'ring.');
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

        res.redirect('/@admin/materials?error=true&message=Kategoriyani o\'zgartirishda xatolik yuz berdi. Iltimos, ma\'lumotlarni tekshirib qayta urinib ko\'ring.');

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

        res.redirect('/@admin/materials?error=true&message=Kategoriyani o\'chirishda xatolik yuz berdi. Iltimos, avval kategoriyaga tegishli materiallarni o\'chiring.');
    }catch(err){
        next(err)
    } 
}

// get items by category
const materials_by_category = async (req, res, next)=>{
    try{
        const category = req.params.id;
        
        const isCategoryExists = await query("SELECT * FROM `learning_material_categories` WHERE `id` = ?", [parseInt(category)]);
        if (isCategoryExists.length == 0) return res.render('./admin/error')
        
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

        if (result.affectedRows) return res.redirect(`/@admin/materials/${category_id}`);

        res.redirect('/@admin/materials/${category_id}?error=true&message=There is an error during the database process.')
    }catch{

    }
}

// update item
const material_put = async (req, res, next) => {
    try{
        const {id, category_id, title, description} = req.body;
        
        const {image, doc} = req;

        const result = await query('call usp_update_learning_material(?,?,?,?,?,?)',
                [id, title, image, description, category_id, doc]
        );

        if (result.affectedRows) return res.redirect(`/@admin/materials/${category_id}`);

        res.redirect(`/@admin/materials/${category_id}?error=true&message=There is an error during the database process.`)

    }
    catch(err){
        next(err)
    } 
}

const material_delete = async (req, res, next) => {
    try{
        const {item_id, id} = req.params;

        const result = await query("DELETE FROM `learning_materials` WHERE `id` = ?", [item_id]);

        if (result.affectedRows) return res.redirect(`/@admin/materials/${id}`);
        res.redirect('/@admin/materials?error=true&message=There is an error during the database process.')

    }catch(err){
        next(err)
    }
}

module.exports = {
    material_menu, materials_by_category, material_menu_post, material_menu_put, material_menu_delete,
    material_post, material_put, material_delete
}