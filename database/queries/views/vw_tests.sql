DROP VIEW IF EXISTS vw_tests;

CREATE VIEW vw_tests AS 
SELECT
    id,
    test_name,
    author_name,
    DATE_FORMAT(created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(updated_at, '%M %e, %Y') AS updated_at
FROM tests;
