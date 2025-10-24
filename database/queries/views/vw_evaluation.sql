DROP VIEW IF EXISTS vw_evaluation;

CREATE VIEW vw_evaluation AS

SELECT 
    id,
    title,
    content,
    image_url,
    DATE_FORMAT(created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(updated_at, '%M %e, %Y') AS updated_at
FROM evaluation_posts 

