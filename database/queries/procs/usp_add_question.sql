DROP PROCEDURE IF EXISTS usp_add_question;

DELIMITER //

CREATE PROCEDURE usp_add_question (
    IN p_test_id INT,
    IN p_question_text TEXT,
    IN p_option_a VARCHAR(255),
    IN p_option_b VARCHAR(255),
    IN p_option_c VARCHAR(255),
    IN p_option_d VARCHAR(255),
    IN p_correct_option CHAR(1)    -- A B C or D
)
BEGIN
    DECLARE v_question_id INT DEFAULT 0;
    DECLARE v_map_id INT DEFAULT 0;
    DECLARE v_position INT DEFAULT 1;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- any error -> rollback and return null ids
        ROLLBACK;
        SELECT NULL AS question_id, NULL AS map_id;
    END;

    START TRANSACTION;

    -- insert question
    INSERT INTO questions (
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        created_at,
        updated_at
    )
    VALUES (
        p_question_text,
        p_option_a,
        p_option_b,
        p_option_c,
        p_option_d,
        p_correct_option,
        NOW(),
        NOW()
    );

    SET v_question_id = LAST_INSERT_ID();

    -- determine next position for this test
    SELECT COALESCE(MAX(position), 0) + 1
      INTO v_position
      FROM test_question_map
     WHERE test_id = p_test_id;

    -- insert into mapping table
    INSERT INTO test_question_map (
        test_id,
        question_id,
        position,
        created_at,
        updated_at
    )
    VALUES (
        p_test_id,
        v_question_id,
        v_position,
        NOW(),
        NOW()
    );

    SET v_map_id = LAST_INSERT_ID();

    COMMIT;

    -- return created ids
    SELECT v_question_id AS question_id, v_map_id AS map_id;
END
//

DELIMITER ;
