import express from 'express';
import loginRouter from './loginRoutes';
import listRouter from './listRoutes';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: any, res: any, next: any) {
  res.send("Hello World!!!!!!!!!!!!!");
});

router.use('/login', loginRouter);
router.use('/list', listRouter);

export default router;
