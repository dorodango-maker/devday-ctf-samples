-- mettya_secretsテーブルの作成
CREATE TABLE IF NOT EXISTS mettya_secrets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    flag TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

TRUNCATE TABLE mettya_secrets;

INSERT INTO mettya_secrets (name, flag, user_id) VALUES
('きみは いま！ ハッカーへの だいいっぽを ふみだした！', 'FLAG{Yo!_Ch4mP_In_The_Mak1nG!}', 1)
