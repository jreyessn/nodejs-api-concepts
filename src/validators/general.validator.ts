import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { validationExpress, validationMessage } from '../utils/validator-express';

export const showIdValidator: any[] = [
    check("id")
        .exists().withMessage(validationMessage("id", "exists"))
        .notEmpty().withMessage(validationMessage("id", "notEmpty"))
        .isMongoId().withMessage(validationMessage("id", "isMongoId")),

    (req: Request, res: Response, next: NextFunction) => validationExpress(req, res, next)
]