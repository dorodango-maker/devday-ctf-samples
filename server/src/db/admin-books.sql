-- admin_booksテーブルの作成
CREATE TABLE IF NOT EXISTS admin_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

TRUNCATE TABLE admin_books;

INSERT INTO admin_books (title, summary, user_id) VALUES
('マジで最強のセキュリティ', '今までにないくらい堅牢なシステム', 1),
('本番障害発生！ポストモーテムのはじめ方！', 'こないだボタン一撃で本番環境吹き飛ばすCI/CD作りました（ガチ）', 2),
('絶対誰にも突破できないシステム', 'information_schemaを見たいだって...？', 4)
