import express from 'express';
import adminController from '../controller/adminController';

const router = express.Router();

router.post('/login', adminController.login);
router.get('/home', adminController.getList);

export default router;

