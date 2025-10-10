DROP PROCEDURE IF EXISTS usp_update_blog;

DELIMITER //

CREATE PROCEDURE usp_update_blog (
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_content TEXT,
    IN p_author VARCHAR(100),
    IN p_image_url VARCHAR(1024)
)
BEGIN
    UPDATE blog_posts
    SET 
        title = p_title,
        content = p_content,
        author = p_author,
        image_url = CASE 
                        WHEN p_image_url IS NOT NULL THEN p_image_url 
                        ELSE image_url 
                    END,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = p_id;
END //

DELIMITER ;