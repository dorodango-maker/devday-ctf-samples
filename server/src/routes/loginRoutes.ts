import Express from 'express'
import loginController from '../controller/loginController'

const router = Express.Router()

router.post('/', loginController.login)

export default router
