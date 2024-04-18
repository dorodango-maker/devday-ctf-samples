import { Request, Response } from "express";
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

// IDとパスワードで認証を行う
export default {
    login: (req: Request, res: Response) => {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(400).send('ID and password are required.');
        }

        // データベースでユーザーを検索
        const query = 'SELECT * FROM users WHERE id = ? AND password = ?';
        connection.query(query, [id, password], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('An error occurred while querying the database.');
            }

            // ユーザーが見つかれば認証成功
            if (results.length > 0) {
                res.send('Authentication successful.');
            } else {
                res.status(401).send('Authentication failed.');
            }
        });
    },
};
