DROP PROCEDURE IF EXISTS usp_update_learning_material;
DELIMITER //

CREATE PROCEDURE usp_update_learning_material (
    IN p_id INT UNSIGNED,
    IN p_title VARCHAR(255),
    IN p_image_url VARCHAR(1024),
    IN p_description TEXT,
    IN p_category_id INT UNSIGNED,
    IN p_file_path VARCHAR(1024)
)
BEGIN
    IF p_file_path IS NULL THEN
        UPDATE learning_materials
        SET title = p_title,
            image_url = p_image_url,
            description = p_description,
            category_id = p_category_id,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;
    ELSE
        UPDATE learning_materials
        SET title = p_title,
            image_url = p_image_url,
            description = p_description,
            category_id = p_category_id,
            file_path = p_file_path,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;
    END IF;
END //

DELIMITER ;
