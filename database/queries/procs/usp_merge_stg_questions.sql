DROP PROCEDURE IF EXISTS usp_merge_stg_questions;

DELIMITER //

CREATE PROCEDURE usp_merge_stg_questions ()
BEGIN
    DECLARE v_err_msg TEXT;
    DECLARE v_sqlstate CHAR(5);
    DECLARE v_err_no INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- capture detailed diagnostics
        GET DIAGNOSTICS CONDITION 1
            v_err_msg = MESSAGE_TEXT,
            v_sqlstate = RETURNED_SQLSTATE,
            v_err_no = MYSQL_ERRNO;

        ROLLBACK;

        -- return structured error info
        SELECT 
            NULL AS success_msg, 
            CONCAT('Error ', v_err_no, ' (SQLSTATE ', v_sqlstate, '): ', v_err_msg) AS error_msg;
    END;

    START TRANSACTION;

    -- 1) insert missing questions
    INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option, created_at, updated_at)
    SELECT 
        s.question, 
        s.option_a, 
        s.option_b, 
        s.option_c, 
        s.option_d, 
        'A', 
        NOW(), 
        NOW()
    FROM stg_questions s
    WHERE NOT EXISTS (
        SELECT 1 FROM questions q
        WHERE q.question_text = s.question
            AND q.option_a = s.option_a
            AND q.option_b = s.option_b
            AND q.option_c = s.option_c
            AND q.option_d = s.option_d
    );

    -- 2) insert mappings
    INSERT INTO test_question_map (test_id, question_id, position, created_at, updated_at)
    SELECT
        s.test_id,
        q.id,
        ROW_NUMBER() OVER (PARTITION BY s.test_id ORDER BY s.question) AS position,
        NOW(), NOW()
    FROM stg_questions s
    JOIN questions q
        ON q.question_text COLLATE utf8mb4_0900_ai_ci = s.question COLLATE utf8mb4_0900_ai_ci
        AND q.option_a COLLATE utf8mb4_0900_ai_ci = s.option_a COLLATE utf8mb4_0900_ai_ci
        AND q.option_b COLLATE utf8mb4_0900_ai_ci = s.option_b COLLATE utf8mb4_0900_ai_ci
        AND q.option_c COLLATE utf8mb4_0900_ai_ci = s.option_c COLLATE utf8mb4_0900_ai_ci
        AND q.option_d COLLATE utf8mb4_0900_ai_ci = s.option_d COLLATE utf8mb4_0900_ai_ci
    WHERE NOT EXISTS (
        SELECT 1 FROM test_question_map tqm
        WHERE tqm.test_id = s.test_id
            AND tqm.question_id = q.id
    );

    COMMIT;

    SELECT 'success' AS success_msg, NULL AS error_msg;

END //

DELIMITER ;
