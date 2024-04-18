import express from 'express';
import listController from '../controller/listController';

const router = express.Router();

router.get('/', listController.getList);

export default router;
