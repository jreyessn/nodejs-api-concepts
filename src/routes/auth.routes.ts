import express  from 'express'
import authController from '../controllers/auth.controller'
import { authLoginValidator, registerUserValidator } from '../validators/auth.validator'

const router = express.Router()

router.post('/register', registerUserValidator, authController.register)
router.post('/login', authLoginValidator, authController.signIn)

export default { prefix: "auth", router }