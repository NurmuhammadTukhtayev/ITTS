const path = require('path');
const { query } = require('../../../database/connction/query');

let cache = {};
const CACHE_TTL_MS = 60 * 500;

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
    if (!isPageRequest(req)) return next(); // ✅ skip static assets

    res.locals.copyrightYear = new Date().getFullYear();

    const now = Date.now();

    if (req.path.includes('@admin') && (!cache.image_url || (now - cache.updatedAt) > CACHE_TTL_MS)) {
    //   console.log('admin');
      const profile_data = await query('select image_url from profile_meta');
      if(profile_data.length > 0) cache.image_url = profile_data[0].image_url;
      cache.updatedAt = now;
    } else if (!cache.learning_material_categories || (now - cache.updatedAt) > CACHE_TTL_MS) {
    //   console.log('public');
      const rows = await query('SELECT * FROM smart_path.learning_material_categories;');
      cache.learning_material_categories = rows;
      cache.updatedAt = now;
    }    
    res.locals.learning_material_categories = cache.learning_material_categories;
    res.locals.image_url = cache.image_url || "";

    return next();
  } catch (err) {
    next(err);
  }
};
