-- use a single database
CREATE DATABASE IF NOT EXISTS smart_path CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
USE smart_path;

-- disable FK checks for safe drops across dependent tables
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS test_results;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS testers;
DROP TABLE IF EXISTS learning_materials;
DROP TABLE IF EXISTS learning_material_categories;
DROP TABLE IF EXISTS media_files;
DROP TABLE IF EXISTS media_videos;
DROP TABLE IF EXISTS blog_posts;

SET FOREIGN_KEY_CHECKS = 1;

-- create lookup / parent tables first
CREATE TABLE IF NOT EXISTS learning_material_categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE learning_material_categories
    ADD CONSTRAINT uc_unique_category_name UNIQUE (category_name);

CREATE TABLE IF NOT EXISTS testers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    test_completed TINYINT(1) DEFAULT 0,
    score INT DEFAULT 0,
    time_taken INT,
    registered_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS questions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option ENUM('A','B','C','D') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- create child tables and add FK constraints with explicit names
CREATE TABLE IF NOT EXISTS learning_materials (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(1024) NULL,
    description TEXT NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    file_path VARCHAR(1024) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_learning_materials_category FOREIGN KEY (category_id)
        REFERENCES learning_material_categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_files (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_type ENUM('video','document') NOT NULL,
    file_path VARCHAR(1024) NOT NULL,
    image_url VARCHAR(1024),
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_videos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(1024) NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100),
    image_url VARCHAR(1024),
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS test_results (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tester_id INT UNSIGNED NOT NULL,
    question_id INT UNSIGNED NULL,
    selected_option ENUM('A','B','C','D'),
    is_correct TINYINT(1),
    taken_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_test_results_tester FOREIGN KEY (tester_id)
        REFERENCES testers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_test_results_question FOREIGN KEY (question_id)
        REFERENCES questions(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- create indexes on FKs for performance
CREATE INDEX idx_learning_materials_category ON learning_materials(category_id);
CREATE INDEX idx_test_results_tester ON test_results(tester_id);
CREATE INDEX idx_test_results_question ON test_results(question_id);
