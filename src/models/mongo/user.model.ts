import mongoose, { SchemaOptions } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const collectionName = "users";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    versionKey: false
}

const UserScheme = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    role: {
        type: ["user", "admin"],
        default: "user"
    }
}, schemaOptions)

UserScheme.plugin(MongooseDelete, { overrideMethods: "all" })

export default mongoose.model(collectionName, UserScheme)