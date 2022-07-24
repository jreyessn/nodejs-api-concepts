import { NextFunction, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import { verifyToken } from "../utils/jwt";
import response from "../utils/responses-http";
import session from "../utils/sessions";

/**
 * Validar el token
 * 
 * @param req Request
 * @param res Response
 * @returns 
 */
const verifyAuth = async (req: Request, res: Response) => {
    if(!req.headers.authorization){
        response.unauthorized(res)
        return null;
    }

    const token      = req.headers.authorization.split(' ').pop()
    const dataToken  = await verifyToken(String(token))

    if(!dataToken._id){
        response.unauthorized(res, "El token suministrado es invalido")
        return null;
    }

    return dataToken;
}

/**
 * Obtener usuario
 * @param id ID
 * @returns 
 */
const getUser = (id: string) => {
    return (new UserRepository).first(id)
}

// =================================================
// @ Export Functions
// =================================================

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const verified = await verifyAuth(req, res)

        if(!verified) return;
        
        const user = await getUser(verified._id)

        req.app.locals.user = user
        session.user        = user
        
        next()
    } catch (error) {
        response.error(res, error)
    }
}