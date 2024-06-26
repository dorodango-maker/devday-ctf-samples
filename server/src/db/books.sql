-- booksテーブルの作成
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

TRUNCATE TABLE books;

INSERT INTO books (title, summary, user_id) VALUES
('ようこそ', 'おいおい、ここは本来社員しか見れないページだぜ。。。', 1),
('実践！メテオフォール型開発', 'メテオフォール型開発で神になる方法100選', 2),
('入門DDD', 'さぁ、締め切り駆動開発を始めよう', 3),
('shellgei', 'シェル芸が結構面白い', 4),
('hint', 'hint() を実行するとヒントがわかるぞい！', 5);
