const { query } = require('../../../database/connction/query');

const get_posts = async (req, res, next) => {
  try {
    const pageSize = 6;                                // items per page
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const offset = (page - 1) * pageSize;

    let totalBlogsResult = (await query("SELECT COUNT(*) AS count FROM smart_path.evaluation_posts;"))[0].count;
    let blogs = await query("SELECT id, title, substring(content, 1, 300) as content, image_url, DATE_FORMAT(created_at, '%M %e, %Y') AS published_on FROM smart_path.evaluation_posts ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?;",
      [pageSize, offset]
    );

    const totalPages = Math.max(Math.ceil(totalBlogsResult / pageSize), 1);
    const currentPage = Math.min(page, totalPages);

    // build a compact page list like: 1 … 4 5 [6] 7 8 … 20
    const pages = [];
    const window = 2; // how many pages around current
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= currentPage - window && p <= currentPage + window)) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== '…') {
        pages.push('…'); // ellipsis marker
      }
    }

    res.render('./shared/evaluation', {
        copyrightYear: res.locals.copyrightYear, 
        learning_material_categories: res.locals.learning_material_categories,
        blogs, 
        pagination: {
          totalBlogsResult,
          totalPages,
          currentPage,
          pageSize,
          hasPrev: currentPage > 1,
          hasNext: currentPage < totalPages,
          prevPage: Math.max(1, currentPage - 1),
          nextPage: Math.min(totalPages, currentPage + 1),
          pages
        }
    });
  } catch (e) {
    next(e);
  }
};

const get_post = async (req, res) => {
  try {
    const blog_id = req.params.blog_id;

    let blog = (await query("SELECT id, title, content, image_url, DATE_FORMAT(created_at, '%M %e, %Y') AS published_on FROM smart_path.evaluation_posts WHERE id = ?;", [blog_id]))[0]
    let blogs = await query("SELECT id, title, substring(content, 1, 300) as content, image_url, DATE_FORMAT(created_at, '%M %e, %Y') AS published_on FROM smart_path.evaluation_posts order by created_at desc limit 5;");

    if (!blog) return res.render('./shared/error', { 
      copyrightYear: res.locals.copyrightYear, 
      learning_material_categories: res.locals.learning_material_categories,
    })

    res.render('./shared/evaluation_details', { 
      copyrightYear: res.locals.copyrightYear, 
      learning_material_categories: res.locals.learning_material_categories,
      blog, 
      blogs 
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  get_posts, get_post
}