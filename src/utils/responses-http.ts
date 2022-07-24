import { Response } from "express"
import { ValidationError } from "../validators/types/validators.type"

const response = {
    
    /**
     * Respuesta exitosa
     * 
     * @param res Response
     * @param opts Options para la respuesta
     * @param code status http
     */
    success(res: Response, opts?: { message?: string, data?: any }, code: number = 200){
        opts = { message: "Se ha ejecutado la acción con éxito", ...opts }
        res.status(code).send(opts)
    },

    /**
     * Respuesta exitosa pero no se responde nada (se utiliza en casos de delete)
     * @param res Response
     */
    notContent(res: Response){
        res.status(204).send()
    }, 

    /**
     * Error interno
     * 
     * @param res Reqsponse
     * @param error Error Exception
     * @param code status
     */
    error(res: Response, error: any, code: number = 500){
        res.status(code).send({
            message: "Ha ocurrido un error interno, contactar a soporte",
            error
        })
    },

    /**
     * Responder los errores de validacion
     * 
     * @param res Response
     * @param errors Error de valiaciones
     */
    errorValidation(res: Response, errors: ValidationError | ValidationError[]){
        res.status(422).send({
            message: "Verifique la información suministrada",
            errors: Array.isArray(errors)? errors : [ errors ]
        })
    },  
     
    /**
     * Recurso no encontrado (cuando no se encuentra nada en la bd o una ruta invalida)
     * 
     * @param res Response
     */
    notFound(res: Response){
        res.status(404).send()
    },

    /**
     * Acceso no autorizado
     * 
     * @param res Response
     * @param msg Mensaje
     */
    unauthorized(res: Response, msg = 'El usuario no se encuentra autenticado'){
        res.status(401).send({ message: msg })
    }
}

export default response