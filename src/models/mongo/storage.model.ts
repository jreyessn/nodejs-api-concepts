import mongoose, { SchemaOptions } from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const collectionName = "storage";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    versionKey: false
}

const StorageScheme = new mongoose.Schema({
    url: String,
    filename: String,
}, schemaOptions)

StorageScheme.plugin(MongooseDelete, { overrideMethods: "all" })

export default mongoose.model(collectionName, StorageScheme)