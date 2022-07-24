import express  from 'express'
import storageController from '../controllers/storage.controller'
import { multerSingle } from '../utils/storage'
import { showIdValidator } from '../validators/general.validator'

const router = express.Router()

router.get('/',    storageController.index)
router.get('/:id', showIdValidator, storageController.show)
router.post('/',   multerSingle('file'), storageController.store)
router.delete('/:id', showIdValidator, storageController.destroy)

export default { prefix: "storage", router }