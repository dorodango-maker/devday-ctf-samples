import createError from 'http-errors';
import express, { Express, Request, Response } from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import indexRouter from './routes/index';

const app: Express = express();

// ビューエンジンの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ミドルウェアの設定
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ルーティングの設定
app.use('/', indexRouter);

// 404エラーハンドリング
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
