import { Request, Response } from "express";
import { StorageConfig } from "../config/storage.config";
import StorageRepository from "../repositories/storage.repository";
import { multerSingle } from "../utils/storage";

const storageRepository = new StorageRepository;

/**
 * Controlador Storage
 */
class StorageController {

    /**
     * Listar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async index(req: Request, res: Response){
        const data = await storageRepository.paginate()

        res.json({ data })
    }

    /**
     * Mostrar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    show(req: Request, res: Response){

        res.json({message: "Shosito"})
    }

    /**
     * Guardar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async store(req: Request, res: Response){
        const { file } = req
        
        try {
            const filedata  = {
                filename: file?.filename,
                url: `${StorageConfig.link_public}${file?.filename}`
            }

            const store = await storageRepository.create(filedata)
            
            res.status(201).json({ data: store })
        } catch (error) {
            // save error log
            res.status(500).json(error)
        }
    }

    /**
     * Actualizar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    update(req: Request, res: Response){

    }

    /**
     * Eliminar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    destroy(req: Request, res: Response){
        
    }

}

export default new StorageController