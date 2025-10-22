DROP VIEW IF EXISTS vw_tests;

CREATE VIEW vw_tests AS 
SELECT
    t.id,
    t.test_name,
    t.author_name,
    DATE_FORMAT(t.created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(t.updated_at, '%M %e, %Y') AS updated_at,
    COUNT(tq.id) AS total_questions
FROM tests t 
LEFT JOIN test_question_map tq ON t.id = tq.test_id
GROUP BY t.id, t.test_name, t.author_name, t.created_at, t.updated_at;
