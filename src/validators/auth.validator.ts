import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import UserRepository from '../repositories/user.repository';
import { validationExpress, validationMessage } from '../utils/validator-express';

export const registerUserValidator: any[] = [
    check("name")
        .exists().withMessage(validationMessage("name", "exists"))
        .notEmpty().withMessage(validationMessage("name", "notEmpty")),    
    check("age")
        .exists().withMessage(validationMessage("age", "exists"))
        .notEmpty().withMessage(validationMessage("age", "notEmpty"))
        .isNumeric(),
    check("email")
        .exists().withMessage(validationMessage("email", "exists"))
        .notEmpty().withMessage(validationMessage("email", "notEmpty"))
        .isEmail()
        .custom(async (value, { path }) => {
            return (new UserRepository).exist(path, value).then((found: any) => {
                return !found? found : Promise.reject(null)
           })
        }).withMessage(validationMessage("email", "unique")),
    check("password")
        .exists().withMessage(validationMessage("password", "exists"))
        .notEmpty().withMessage(validationMessage("password", "notEmpty"))
        .isLength({ min: 6 }),
    (req: Request, res: Response, next: NextFunction) => validationExpress(req, res, next)
]

export const authLoginValidator: any[] = [
    check("email")
        .exists().withMessage(validationMessage("email", "exists"))
        .notEmpty().withMessage(validationMessage("email", "notEmpty"))
        .isEmail(),
    check("password")
        .exists().withMessage(validationMessage("password", "exists"))
        .notEmpty().withMessage(validationMessage("password", "notEmpty")),
    (req: Request, res: Response, next: NextFunction) => validationExpress(req, res, next)
]