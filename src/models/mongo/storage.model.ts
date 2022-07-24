import mongoose, { SchemaOptions } from 'mongoose';

const collectionName = "storage";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    versionKey: false
}

const StorageScheme = new mongoose.Schema({
    url: String,
    filename: String,
}, schemaOptions)

export default mongoose.model(collectionName, StorageScheme)