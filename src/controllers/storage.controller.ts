import { Request, Response } from "express";
import { StorageConfig } from "../config/storage.config";
import StorageRepository from "../repositories/storage.repository";
import response from "../utils/responses-http";
import { unlinkStorage } from "../utils/storage";

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

        response.success(res, { data })
    }

    /**
     * Mostrar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async show(req: Request, res: Response){
        try {
            const data = await storageRepository.first(req.params["id"])
            
            if(!data) throw("Not found")

            response.success(res, { data })
        } catch (error) {
            response.notFound(res)
        }
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

            const data = await storageRepository.create(filedata)
            
            response.success(res, { data }, 201)
        } catch (error) {
            response.error(res, error)
        }
    }

    /**
     * Eliminar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async destroy(req: Request, res: Response){
        try {
            const item = await storageRepository.first(req.params["id"])
            
            if(!item) throw("Not found")
            
            await storageRepository.destroy(req.params["id"])

            unlinkStorage(item.filename)

            response.notContent(res)
        } catch (error) {
            response.notFound(res)
        }
    }

}

export default new StorageController