DROP PROCEDURE IF EXISTS usp_handle_media_page;

DELIMITER //

CREATE PROCEDURE usp_handle_media_page (IN p_category VARCHAR(255))
BEGIN
    IF p_category = 'videos' THEN
        SELECT * FROM vw_media WHERE file_type = 'video';
    ELSEIF p_category = 'presentations' THEN
        SELECT * FROM vw_media WHERE file_type = 'document';
    END IF;
END //

DELIMITER ;