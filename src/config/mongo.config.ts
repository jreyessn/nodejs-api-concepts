require("dotenv").config()
import mongoose from 'mongoose';

export const MongoConfig = {

    uri: process.env["APP_MONGO_URL"] || '',

    options: {

    },

    run(){
        this.connect()
    },

    connect() {
        mongoose.connect(this.uri, this.options, 
        (err) => {
            if(err){
                 console.log("Error de conexión de Mongo", err)
            }
        })
    }

}