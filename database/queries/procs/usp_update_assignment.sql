DROP PROCEDURE IF EXISTS usp_update_assignment;
DELIMITER //

CREATE PROCEDURE usp_update_assignment (
    IN p_id INT UNSIGNED,
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_file_path VARCHAR(1024)
)
BEGIN
    IF p_file_path IS NULL THEN
        UPDATE assignments
        SET title = p_title,
            description = p_description,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;
    ELSE
        UPDATE assignments
        SET title = p_title,
            description = p_description,
            file_path = p_file_path,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;
    END IF;
END //

DELIMITER ;
