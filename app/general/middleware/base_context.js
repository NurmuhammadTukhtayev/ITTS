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

    res.locals.copyrightYear = new Date().getFullYear();

    if (req.path.includes('@admin')) {
      const [{ last_updated }] = await query(`SELECT MAX(updated_at) AS last_updated FROM profile_meta`);
      if (!cache.image_url || cache.last_image_update !== last_updated) {
        const rows = await query(`SELECT image_url, MAX(updated_at) AS last_updated FROM profile_meta group by image_url`);
        if (rows.length > 0) {
          cache.image_url = rows[0].image_url;
          cache.last_image_update = last_updated;
        }
      }
    } else {
      const [{ last_updated }] = await query(`SELECT MAX(updated_at) AS last_updated FROM smart_path.learning_material_categories`);
      if (!cache.learning_material_categories || cache.last_categories_update !== last_updated) {
        const rows = await query(`SELECT * FROM smart_path.learning_material_categories`);
        cache.learning_material_categories = rows;
        cache.last_categories_update = last_updated;
      }
    }

    res.locals.learning_material_categories = cache.learning_material_categories;
    res.locals.image_url = cache.image_url || "";

    return next();
  } catch (err) {
    next(err);
  }
};
