import express  from 'express'
import tracksController from '../controllers/tracks.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { roleMiddleware } from '../middlewares/role.middleware'
import { showIdValidator } from '../validators/general.validator'
import { storeTrackValidator } from '../validators/tracks.validator'

const router = express.Router()

router.get('/',    authMiddleware, roleMiddleware(["admin"]), tracksController.index)
router.get('/:id', showIdValidator, tracksController.show)
router.post('/',   storeTrackValidator, tracksController.store)
router.put('/:id', showIdValidator, storeTrackValidator, tracksController.update)
router.delete('/:id', showIdValidator, tracksController.destroy)

export default { prefix: "tracks", router }