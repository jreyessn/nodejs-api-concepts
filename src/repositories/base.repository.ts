export default class BaseRepository {
    
    public model;

    constructor(model: any){
        this.model = model;
    }

    /**
     * Obtener un recurso
     * 
     * @param id ID resource
     * @returns 
     */
    first(id: number | string){
        return this.model.findById(id)
    }

    /**
     * Crear un recurso
     * 
     * @param payload Body
     * @returns 
     */
    create(payload: any){
        return this.model.create(payload)
    }

    /**
     * Actualizar un recurso
     * 
     * @param id Id resource
     * @param payload Body
     * @returns 
     */
    update(id: number | string, payload: any){
        return this.model.findByIdAndUpdate(id, payload, { new: true })
    }

    /**
     * Eliminar un recurso
     * 
     * @param id ID resource
     * @returns 
     */
    destroy(id: number | string){
        return this.model.findByIdAndDelete(id)
    }
    
}