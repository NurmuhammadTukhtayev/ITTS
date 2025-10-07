DROP PROCEDURE IF EXISTS usp_handle_media_page;

DELIMITER //

CREATE PROCEDURE usp_handle_media_page (IN p_category VARCHAR(255))
BEGIN
    IF p_category = 'videos' THEN
        SELECT * FROM media_videos;
    ELSEIF p_category = 'presentations' THEN
        SELECT * FROM media_files;
    END IF;
END //

DELIMITER ;