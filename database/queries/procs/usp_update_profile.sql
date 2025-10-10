DROP PROCEDURE IF EXISTS usp_update_profile;

DELIMITER //

CREATE PROCEDURE usp_update_profile (
    IN p_id INT UNSIGNED,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_job VARCHAR(50),
    IN p_about_me TEXT,
    IN p_experience_years INT,
    IN p_phone VARCHAR(20),
    IN p_email VARCHAR(50),
    IN p_telegram VARCHAR(50),
    IN p_image_url VARCHAR(1024)
)
BEGIN
    IF EXISTS (SELECT * FROM profile_meta WHERE id = p_id)
    THEN 
        UPDATE profile_meta
        SET 
            first_name = p_first_name,
            last_name = p_last_name,
            job = p_job,
            about_me = p_about_me,
            experience_years = p_experience_years,
            phone = p_phone,
            email = p_email,
            telegram = p_telegram,
            image_url = CASE 
                            WHEN p_image_url IS NOT NULL THEN p_image_url 
                            ELSE image_url 
                        END,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_id;
    ELSE 
        INSERT INTO profile_meta (first_name, last_name, job, about_me, experience_years, phone, email, telegram, image_url)
        VALUES (p_first_name, p_last_name, p_job, p_about_me, p_experience_years, p_phone, p_email, p_telegram, p_image_url);

    END IF;
END //

DELIMITER ;