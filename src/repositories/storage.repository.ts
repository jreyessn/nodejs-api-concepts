import models from "../models/handler";
import BaseRepository from "./base.repository";

export default class StorageRepository extends BaseRepository {

    constructor(){
        super(models.storage)
    }

    async paginate(){
        return await this.model.find({})
    }

}