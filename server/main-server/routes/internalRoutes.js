import express from 'express'
import syncUserProfile from '../controllers/user/syncUserProfile.js';

const internalRouter = express.Router()


internalRouter.post('/sync', express.json(), syncUserProfile);


export default internalRouter;