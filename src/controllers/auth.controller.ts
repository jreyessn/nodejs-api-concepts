import { Request, Response } from "express";
import { matchedData } from "express-validator";
import UserRepository from "../repositories/user.repository";
import { tokenSign } from "../utils/jwt";
import { hashPassword } from "../utils/password";
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
            const data = await userRepository.first(req.params["id"])
            
            if(!data) throw("Not found")

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
            const data     = await userRepository.create(body)
            const token    = await tokenSign(data)

            data.set('password', undefined, { strict: false })

            response.success(res, { 
                data: {
                    user: data,
                    token
                },
             }, 201)
        } catch (error) {
            response.error(res, error)
        }
    }

}

export default new AuthController