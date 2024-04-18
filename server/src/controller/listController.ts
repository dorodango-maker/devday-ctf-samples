import { Request, Response } from 'express';
import mysql from "mysql";
import config from "../config/db";

// MySQL データベースへの接続設定
const connection = mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

// booksテーブルから一覧を取得する
export default {
    getList: (req: Request, res: Response) => {
        const searchTerm = req.query.search || '';
        const query = 'SELECT * FROM books WHERE title LIKE ? OR summary LIKE ?';
        connection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'データベースのクエリ中にエラーが発生しました。' });
            }
            res.json({ success: true, data: results });
        });
    }
};