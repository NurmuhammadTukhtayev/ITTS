DROP VIEW IF EXISTS vw_test_questions;

CREATE VIEW vw_test_questions AS 
SELECT
	t.id as test_id,
    q.id,
    q.question_text,
    q.option_a,
    q.option_b,
    q.option_c,
    q.option_d,
    q.correct_option,
    DATE_FORMAT(q.created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(q.updated_at, '%M %e, %Y') AS updated_at
FROM tests t 
INNER JOIN test_question_map tqm ON t.id = tqm.test_id
INNER JOIN questions q ON tqm.question_id = q.id;
