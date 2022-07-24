import mongoose, { SchemaOptions } from 'mongoose';

const collectionName = "tracks";

const schemaOptions: SchemaOptions = {
    timestamps: true,
    versionKey: false
}

const TrackScheme = new mongoose.Schema({
    name: String,
    album: String,
    cover: {
        type: String,
        validate: {
            validator: (req: any) => {
                return true
            },
            message: "ERROR"
        }
    },
    artist: {
        name: String,
        nickname: String,
        nationality: String,
    },
    duration: {
        start: Number,
        end: Number,
    },
    mediaId: { 
        type: mongoose.Schema.Types.ObjectId
    }
}, schemaOptions)

export default mongoose.model(collectionName, TrackScheme)