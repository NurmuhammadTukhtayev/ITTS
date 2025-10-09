DROP VIEW IF EXISTS vw_material_items;

CREATE VIEW vw_material_items AS
SELECT
    l.id,
    c.id as category_id,
    l.title,
    l.description,
    c.category_name,
    l.file_path,
    DATE_FORMAT(l.created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(l.updated_at, '%M %e, %Y') AS updated_at
FROM
learning_materials l 
LEFT JOIN learning_material_categories c ON l.category_id = c.id;
