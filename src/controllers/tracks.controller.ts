import { Request, Response } from "express";
import { matchedData } from "express-validator";
import TrackRepository from "../repositories/track.repository";
import response from "../utils/responses-http";
import session from "../utils/sessions";

const trackRepository = new TrackRepository;

/**
 * Controlador Track
 */
class TracksController {

    /**
     * Listar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async index(req: Request, res: Response): Promise<void>{
        const data = await trackRepository.paginate()
        
        console.log("Usuario en sesión: ", session.user.email)

        response.success(res, { data })
    }

    /**
     * Mostrar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async show(req: Request, res: Response): Promise<void>{
        try {
            const data = await trackRepository.first(req.params["id"])
            
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
    async store(req: Request, res: Response): Promise<void>{
        try {
            const body = matchedData(req) 
            const data = await trackRepository.create(body)
            
            response.success(res, { data }, 201)
        } catch (error) {
            response.error(res, error)
        }
    }

    /**
     * Actualizar recursos
     * 
     * @param {Request} req Request express
     * @param {Response} res Response express
     */
    async update(req: Request, res: Response): Promise<void>{
        try {
            const { id, ...body } = matchedData(req) 
            const data = await trackRepository.update(id, body)
            
            response.success(res, { data })
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
    async destroy(req: Request, res: Response): Promise<void>{
        try {
            const data = await trackRepository.destroy(req.params["id"])
            
            if(!data) throw("Not found")

            response.notContent(res)
        } catch (error) {
            response.notFound(res)
        }
    }

}

export default new TracksController