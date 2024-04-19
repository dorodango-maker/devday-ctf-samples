-- usersテーブルの作成
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

TRUNCATE TABLE users;

INSERT INTO users (name, password) VALUES
('CTO', '1234'),
('Bob', 'password2024'),
('Charlie', 'securePass'),
('David', 'myPass456'),
('Eve', 'pass789');
