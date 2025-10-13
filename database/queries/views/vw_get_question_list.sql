DROP VIEW IF EXISTS vw_get_question_list;

CREATE VIEW vw_get_question_list AS
SELECT 
    t.id AS test_id,
	  q.id AS question_id,
    q.question_text,
    q.option_a,
    q.option_b,
    q.option_c,
    q.option_d,
    tr.id AS track_id,
	tr.tester_id
FROM questions q 
JOIN test_question_map tqm ON tqm.question_id = q.id
JOIN tests t ON t.id = tqm.test_id
LEFT JOIN test_session ts ON ts.question_id = q.id
LEFT JOIN test_results tr ON tr.id = ts.test_result_id;
