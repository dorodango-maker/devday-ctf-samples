import express from 'express';
import loginRouter from './loginRoutes';
import listRouter from './listRoutes';
import adminRouter from './adminRoutes';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {
  res.send("Hello World!!!!!!!!!!!!!");
});

router.use('/login', loginRouter);
router.use('/list', listRouter);
router.use('/admin', adminRouter);

export default router;
