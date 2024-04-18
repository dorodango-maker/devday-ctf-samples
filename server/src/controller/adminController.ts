import { Request, Response } from 'express';
import mysql from "mysql";
import config from "../config/db";

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

export default {
    login: (req: Request, res: Response) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'ID and password are required.' });
        }

        // SQLインジェクションが可能なクエリ
        const query = `SELECT * FROM admin_users WHERE name = '${username}' AND password = '${password}'`;
        connection.query(query, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'データベースのクエリ中にエラーが発生しました。' });
            }

            if (results.length > 0) {
                res.json({ success: true, message: 'Authentication successful.', data: { userId: results[0].id } });
            } else {
                res.status(401).json({ success: false, message: 'Authentication failed.' });
            }
        });
    },
    getList: (req: Request, res: Response) => {
        const searchTerm = req.query.search || '';
        const query = 'SELECT * FROM admin_books WHERE title LIKE ? OR summary LIKE ?';
        connection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'データベースのクエリ中にエラーが発生しました。' });
            }
            res.json({ success: true, data: results });
        });
    }
};
