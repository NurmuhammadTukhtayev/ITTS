const { query } = require('../../../database/connction/query');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Fetch material info from DB by ID
    const [material] = await query('SELECT file_path FROM learning_materials WHERE file_path = ?', [id]);

    if (!material || !material.file_path) 
      return res.render('./shared/error', { 
          copyrightYear: res.locals.copyrightYear, 
          learning_material_categories: res.locals.learning_material_categories,
      });

    const filePath = path.join(__dirname, '../../../public/uploads/docs', material.file_path);
    if (!fs.existsSync(filePath)) 
      return res.render('./shared/error', { 
        copyrightYear: res.locals.copyrightYear, 
        learning_material_categories: res.locals.learning_material_categories,
      });

    res.download(filePath); // this sets headers for download
  } catch (error) {
    next(error);
  }
}
