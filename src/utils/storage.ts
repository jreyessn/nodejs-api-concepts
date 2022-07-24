import multer from 'multer';
import { StorageConfig } from '../config/storage.config';

/**
 * Configuración disk storage
 */
const storage = multer.diskStorage({
    destination(req, res, next){
        const pathStorage = `${__dirname}/../../${StorageConfig.public_path}`;
        next(null, pathStorage)
    },
    filename(req, file, next){
        const ext       = file.originalname.split(".").pop()
        const filename  = `file-${Date.now()}.${ext}`
        next(null, filename)
    }
})


// ======================================================================
// @ Export functions
// ======================================================================

export const multerSingle = (filename: string) => {
    return multer({ storage }).single(filename)
}

