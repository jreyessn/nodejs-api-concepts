import { Request, Response } from "express";
import { matchedData } from "express-validator";
import UserRepository from "../repositories/user.repository";
import { tokenSign } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";
import response from "../utils/responses-http";

const userRepository = new UserRepository;

/**
 * Controlador Auth
 */
class AuthController {

    /**
     * Login
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async signIn(req: Request, res: Response): Promise<void>{
        try {
            const body         = matchedData(req) 
            const user         = await userRepository.findEmail(body.email)
            const hashPassword = comparePassword(String(body.password), String(user?.password))
            
            if(!user || !hashPassword){
                return response.errorValidation(res, [{
                    value: body.email,
                    msg:   "Las credenciales son invalidas"
                }])
            }
            
            user.set("password", undefined, { strict: false })

            const data = {
                token: await tokenSign(user),
                user
            }

            response.success(res, { data })
        } catch (error) {
            response.notFound(res)
        }
    }

    /**
     * Registrar usuario
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async register(req: Request, res: Response): Promise<void>{
        try {
            const password = hashPassword(req.body['password']) 
            const body     = { ...matchedData(req),  password }
            const user     = await userRepository.create(body)

            user.set('password', undefined, { strict: false })

            const data = {
                user,
                token: await tokenSign(user)
            }

            response.success(res, { data }, 201)
        } catch (error) {
            response.error(res, error)
        }
    }

}

export default new AuthController