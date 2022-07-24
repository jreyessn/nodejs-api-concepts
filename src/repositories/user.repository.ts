import models from "../models/handler";
import BaseRepository from "./base.repository";

export default class UserRepository extends BaseRepository {

    constructor(){
        super(models.user)
    }

    async paginate(){
        return await this.model.find({})
    }

    /**
     * Comprueba si existe el valor
     * 
     * @param value Value
     * @returns 
     */
    exist(field: string, value: string){
        return this.model.findOne({ [field]: { $regex: '.*' + value + '.*', $options: 'i' } })
    }

    /**
     * Buscar usuario por el email
     * 
     * @param email email
     */
    findEmail(email: string){
        return this.model.findOne({ email }).select("_id name email role password")
    }

}