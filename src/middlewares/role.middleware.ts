import { NextFunction, Request, Response } from "express";
import response from "../utils/responses-http";

// =================================================
// @ Export Functions
// =================================================

export const roleMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user }  = req.app.locals
        const someFound = roles.some(roleName => user.role.includes(roleName))

        if(!someFound){
            return response.unauthorized(res, "No tiene permisos para acceder a este recurso")
        }

        next()
    } catch (error) {
        response.error(res, error)
    }
}