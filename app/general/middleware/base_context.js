const path = require('path');
const { query } = require('../../../database/connction/query');

let cache = {};

function isPageRequest(req) {
  if (!['GET', 'HEAD'].includes(req.method)) return false;
  if (req.path === '/favicon.ico') return false;

  const accept = (req.headers.accept || '').toLowerCase();
  if (!accept.includes('text/html')) return false;

  const ext = path.extname(req.path).toLowerCase();
  if (ext && ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.map', '.woff', '.woff2', '.ttf'].includes(ext)) {
    return false;
  }

  if (req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest') return false;
  return true;
}

module.exports = async (req, res, next) => {
  try {
    if (!isPageRequest(req)) return next();

    res.locals.image_url = "";

    // get copyright year
    res.locals.copyrightYear = new Date().getFullYear();

    let rows = await query(`SELECT image_url FROM profile_meta`);
    if (rows.length > 0) res.locals.image_url = rows[0].image_url;

    rows = await query(`SELECT * FROM smart_path.learning_material_categories`);

    res.locals.learning_material_categories = rows;

    return next();
  } catch (err) {
    next(err);
  }
};
