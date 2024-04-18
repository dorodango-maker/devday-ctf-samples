-- usersテーブルの作成
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

TRUNCATE TABLE users;

INSERT INTO users (name, password) VALUES
('Alice', 'password123'),
('Bob', 'password2024'),
('Charlie', 'securePass'),
('David', 'myPass456'),
('Eve', 'pass789');
