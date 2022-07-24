import { NextFunction, Request, Response } from 'express';
import { body, check, checkSchema } from 'express-validator';
import { Track } from '../models/types/track.type';
import TrackRepository from '../repositories/track.repository';
import { validationExpress, validationMessage } from '../utils/validator-express';

export const storeTrackValidator: any[] = [
    checkSchema({
        album: {
            exists: {
                errorMessage: validationMessage("album", "exists")
            },
            notEmpty: {
                errorMessage: validationMessage("album", "notEmpty")
            },
            custom: {
                options: async (value, { path }) => {
                   return (new TrackRepository).exist(path, value).then((found: Track) => {
                        return !found? found : Promise.reject(null)
                   })
                },
                errorMessage: validationMessage("album", "unique")
            }
        }
    }),
    
    check("name")
        .exists().withMessage(validationMessage("name", "exists"))
        .notEmpty().withMessage(validationMessage("name", "notEmpty")),
    
    body("otrocampo").trim(),

    check("cover").exists().notEmpty(),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty(),
    check("artist.nickname").exists().notEmpty(),
    check("artist.nationality").exists().notEmpty(),
    check("duration").exists().notEmpty(),
    check("duration.start").exists().notEmpty(),
    check("duration.end").exists().notEmpty(),
    check("mediaId").exists().notEmpty().isMongoId(),
    (req: Request, res: Response, next: NextFunction) => validationExpress(req, res, next)
]