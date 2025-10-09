const {query} = require('../../../database/connction/query');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch material info from DB by ID
    const learning_material_categories  = await query('SELECT * FROM learning_material_categories ');
    const [material] = await query('SELECT file_path FROM learning_materials WHERE file_path = ?', [id]);
    
    if (!material || !material.file_path) return res.render('./shared/error', {learning_material_categories , copyrightYear:2023});

    const filePath = path.join(__dirname, '../../../public/uploads/docs', material.file_path);
    if (!fs.existsSync(filePath)) {
      return res.render('./shared/error', {learning_material_categories , copyrightYear:2023});
    }
    
    res.download(filePath, {learning_material_categories , copyrightYear:2023}); // this sets headers for download
  } catch (error) {
    res.render('./shared/error', {learning_material_categories , copyrightYear:2023});
  }
}
