import multer from 'multer';
import { StorageConfig } from '../config/storage.config';
import fs from 'fs';

const pathStorage = `${__dirname}/../../${StorageConfig.public_path}`;

/**
 * Configuración disk storage
 */
const storage = multer.diskStorage({
    destination(req, res, next){
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

/**
 * Middleware para un archivo
 * 
 * @param filename Filename from payload
 * @returns 
 */
export const multerSingle = (filename: string) => {
    return multer({ storage }).single(filename)
}

/**
 * Eliminado fisico
 * 
 * @param filename filename
 */
export const unlinkStorage = (filename: string) => {
    fs.unlinkSync(`${pathStorage}/${filename}`)
}
