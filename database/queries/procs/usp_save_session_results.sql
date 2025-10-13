DROP PROCEDURE IF EXISTS usp_save_session_results;

DELIMITER //

CREATE PROCEDURE usp_save_session_results (
    IN p_track_id INT, 
    IN p_score INT
)
BEGIN
    -- update test results 
    UPDATE test_results
        SET test_completed = 1,
        score = p_score,
        time_taken = TIMESTAMPDIFF(SECOND, created_at, NOW())
    WHERE id = p_track_id;

END //

DELIMITER ;
