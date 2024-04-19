-- admin_usersテーブルの作成
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

TRUNCATE TABLE admin_users;

INSERT INTO admin_users (name, password) VALUES
('Bob', 'password2024'),
('Charlie', 'securePass'),
('David', 'myPass456'),
('Eve', 'pass789');
