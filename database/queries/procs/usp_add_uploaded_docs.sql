DROP PROCEDURE IF EXISTS usp_add_uploaded_docs;

DELIMITER //

CREATE PROCEDURE usp_add_uploaded_docs (
    IN p_test_name varchar(50),
    IN p_author_name varchar(50),
    IN p_document_name TEXT,
    IN p_attempts_allowed INT
)
BEGIN
    DECLARE v_uploaded_record_id INT DEFAULT 0;
    DECLARE v_new_test_id INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- any error -> rollback and return null ids
        ROLLBACK;
        SELECT 'Please make sure the data you are inserting is correct.' AS error_msg;
    END;

    START TRANSACTION;

    INSERT INTO tests(test_name, author_name, attempts_allowed)
    VALUES (p_test_name, p_author_name, p_attempts_allowed);

    SET v_new_test_id = LAST_INSERT_ID();

    INSERT INTO uploaded_docs(test_id, document_name) 
    VALUES(v_new_test_id, p_document_name);

    SET v_uploaded_record_id = LAST_INSERT_ID();

    COMMIT;

    SELECT 
        v_new_test_id as test_id, 
        document_name, 
        file_path 
    FROM uploaded_docs 
    WHERE id = v_uploaded_record_id;

END
//

DELIMITER ;
