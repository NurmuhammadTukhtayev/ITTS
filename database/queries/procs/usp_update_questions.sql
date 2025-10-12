DROP PROCEDURE IF EXISTS usp_update_questions;
DELIMITER //

CREATE PROCEDURE usp_update_questions (
    IN p_id INT,
    IN p_question_text TEXT,
    IN p_option_a VARCHAR(255),
    IN p_option_b VARCHAR(255),
    IN p_option_c VARCHAR(255),
    IN p_option_d VARCHAR(255),
    IN p_correct_option CHAR(1)    -- A B C or D
)
BEGIN
    UPDATE questions 
    SET 
        question_text = p_question_text,
        option_a = p_option_a,
        option_b = p_option_b, 
        option_c = p_option_c, 
        option_d = p_option_d, 
        correct_option = p_correct_option
    WHERE id = p_id;
END //

DELIMITER ;
