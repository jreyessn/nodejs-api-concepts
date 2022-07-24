import { NextFunction, Request, Response } from 'express';
import { validationResult } from "express-validator"
import { appConfig } from '../config/app.config';
import attributesMessages from '../lang/es/validation.lang';
import { capitalizeFirstLetter } from './helper';
import response from './responses-http';

// ======================================================================
// @ Export functions
// ======================================================================

/**
 * Ejecuta las validaciones
 * 
 * @param {Request} req Request Express 
 * @param {Response} res Response Express 
 * @param {NextFunction} next Next Express
 * @returns 
 */
export const validationExpress = (req: Request, res: Response, next: NextFunction): void => {
    try {
        validationResult(req).throw()
        next()
    } catch (error: any) {
        response.errorValidation(res, error.array())
    }
}

/**
 * Construye el mensaje de error según los atributos y reglas que estén escritos en el objeto lang
 * 
 * @param {string} field Atributo del mensaje
 * @param {string} rule Regla del mensaje 
 * @returns 
 */
export const validationMessage = (field: string, rule: string) => {
    const attribute = attributesMessages['attributes'][field] ?? capitalizeFirstLetter(field)
    const message   = attributesMessages['messages'][rule] ?? ""

    return message.replace(":attribute", attribute)
}