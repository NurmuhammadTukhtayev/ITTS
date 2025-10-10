DROP VIEW IF EXISTS vw_blogs;

CREATE VIEW vw_blogs AS

SELECT 
    id,
    title,
    content,
    author,
    image_url,
    DATE_FORMAT(created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(updated_at, '%M %e, %Y') AS updated_at
FROM blog_posts 

