DROP VIEW IF EXISTS vw_media;

CREATE VIEW vw_media AS
SELECT
    id,
    title,
    image_url,
    file_type,
    file_path,
    video_url,
    DATE_FORMAT(created_at, '%M %e, %Y') AS created_at,
    DATE_FORMAT(updated_at, '%M %e, %Y') AS updated_at
FROM media;
