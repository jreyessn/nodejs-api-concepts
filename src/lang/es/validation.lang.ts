const attributesMessages: { attributes: any, messages: any } = {
    attributes: {
        "name": "Nombre",
        "album": "Album"
    },
    messages: {
        "exists":    "El campo :attribute debe existir en el cuerpo de la petición",
        "notEmpty":  "El campo :attribute es requerido",
        "unique":    "El valor del :attribute ya se encuentra en uso",
        "isMongoId": "El campo :attribute debe ser una ID de Mongo"
    }
}

export default attributesMessages