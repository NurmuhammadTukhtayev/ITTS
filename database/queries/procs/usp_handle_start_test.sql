DROP PROCEDURE IF EXISTS usp_handle_start_test;

DELIMITER //

CREATE PROCEDURE usp_handle_start_test (
    IN p_first_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_email VARCHAR(255),
    IN p_phone VARCHAR(20),
    IN p_test_id INT
)
BEGIN
    DECLARE v_user_id INT DEFAULT 0;
    DECLARE v_test_result_id INT;

    -- Check if user exists
    SELECT id INTO v_user_id
    FROM testers
    WHERE first_name COLLATE utf8mb4_unicode_ci = p_first_name COLLATE utf8mb4_unicode_ci
        AND last_name COLLATE utf8mb4_unicode_ci = p_last_name COLLATE utf8mb4_unicode_ci
        AND email COLLATE utf8mb4_unicode_ci = p_email COLLATE utf8mb4_unicode_ci
        AND phone COLLATE utf8mb4_unicode_ci = p_phone COLLATE utf8mb4_unicode_ci
    LIMIT 1;
    
    -- If not found, insert and get the new ID
    IF v_user_id IS NULL OR v_user_id = 0 THEN
        INSERT INTO testers (first_name, last_name, email, phone)
        VALUES (p_first_name, p_last_name, p_email, p_phone);
        
        SET v_user_id = LAST_INSERT_ID();
    END IF;
    
    -- check if user has unfinished test
    SELECT id INTO v_test_result_id
    FROM test_results
    WHERE tester_id = v_user_id
        AND test_completed = 0
    LIMIT 1;

	-- if there is no active session found create it
    IF v_test_result_id IS NULL THEN 
        -- create test for user
        INSERT INTO test_results(tester_id) VALUES(v_user_id);

        SET v_test_result_id = LAST_INSERT_ID();

        -- add random test to the table for session
        INSERT INTO test_session(test_result_id, question_id)
        SELECT v_test_result_id, question_id
        FROM vw_get_question_list
        WHERE test_id = p_test_id
        ORDER BY RAND()
        LIMIT 15;

    END IF;

    -- return test session
    SELECT v_user_id AS tester_id, v_test_result_id AS track_id;

END //

DELIMITER ;
