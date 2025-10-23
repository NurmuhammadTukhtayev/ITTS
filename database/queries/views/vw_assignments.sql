DROP VIEW IF EXISTS vw_assignments;

CREATE VIEW vw_assignments AS
SELECT
    id,
    title,
    description,
    file_path,
    DATE_FORMAT(created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(updated_at, '%M %e, %Y') AS updated_at
FROM
assignments;
