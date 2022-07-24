import { Response } from "express"

const response = {
    
    success(res: Response, opts?: { message?: string, data?: any }, code: number = 200){
        opts = { message: "Se ha ejecutado la acción con éxito", ...opts }
        res.status(code).send(opts)
    },

    notContent(res: Response){
        res.status(204).send()
    }, 

    error(res: Response, error: any, code: number = 500){
        res.status(code).send({
            message: "Ha ocurrido un error interno, contactar a soporte",
            error
        })
    },

    errorValidation(res: Response, errors: any){
        res.status(422).send({
            message: "Verifique la información suministrada",
            errors
        })
    },  
     
    notFound(res: Response){
        res.status(404).send()
    }
}

export default response