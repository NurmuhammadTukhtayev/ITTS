DROP PROCEDURE IF EXISTS usp_update_media;

DELIMITER //

CREATE PROCEDURE usp_update_media (
    IN p_id INT UNSIGNED,
    IN p_title VARCHAR(255),
    IN p_file_type ENUM('video', 'document'),
    IN p_video_url VARCHAR(1024),
    IN p_file_path VARCHAR(1024),
    IN p_image_url VARCHAR(1024)
)
BEGIN
    UPDATE media
    SET 
        title = p_title,
        file_type = p_file_type,
        video_url = CASE 
                        WHEN p_file_type = 'video' THEN p_video_url 
                        ELSE NULL 
                    END,
        file_path = CASE 
                        WHEN p_file_path IS NOT NULL THEN p_file_path 
                        ELSE file_path 
                    END,
        image_url = CASE 
                        WHEN p_image_url IS NOT NULL THEN p_image_url 
                        ELSE image_url 
                    END,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;
END //

DELIMITER ;