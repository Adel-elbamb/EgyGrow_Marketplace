import Router from 'express'
import {signUp ,login } from './controller/auth.controller.js'
import validation from '../../middleware/validation.js'
import {registerSchema , loginSchema} from './auth.validation.js'
const router = Router()

router.post("/" ,validation(registerSchema) , signUp)
router.post("/login",validation(loginSchema),login)

export default router