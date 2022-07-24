import StorageModel from './mongo/storage.model';
import TrackModel from './mongo/track.model';
import UserModel from './mongo/user.model';

const models = {
    user:    UserModel,
    track:   TrackModel,
    storage: StorageModel,
}

export default models