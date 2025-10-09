DROP VIEW IF EXISTS vw_material_categories;

CREATE VIEW vw_material_categories AS

SELECT 
    id,
    category_name,
    DATE_FORMAT(created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(updated_at, '%M %e, %Y') AS updated_at
FROM learning_material_categories lm

