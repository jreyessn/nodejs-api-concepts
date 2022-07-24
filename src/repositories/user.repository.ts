import models from "../models/handler";
import BaseRepository from "./base.repository";

export default class UserRepository extends BaseRepository {

    constructor(){
        super(models.user)
    }

    async paginate(){
        return await this.model.find({})
    }

}