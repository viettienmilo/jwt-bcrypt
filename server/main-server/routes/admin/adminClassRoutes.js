import express from 'express'

import { authUserMiddleware, authRoleMiddleware } from '../../middlewares/authMiddleware.js';

import fetchMany from '../../controllers/admin/class/fetchMany.js';
import fetchOne from '../../controllers/admin/class/fetchOne.js';
import deleteOne from '../../controllers/admin/class/deleteOne.js';
import createOne from '../../controllers/admin/class/createOne.js';
import updateOne from '../../controllers/admin/class/updateOne.js';

const adminClassRouter = express.Router();

adminClassRouter.get('/',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchMany,
);

adminClassRouter.get('/:id',
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    fetchOne,
);

adminClassRouter.delete('/:id',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    deleteOne,
);

adminClassRouter.post('/new',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    createOne,
)

adminClassRouter.put('/:id',
    express.json(),
    authUserMiddleware,
    authRoleMiddleware("ADMIN"),
    updateOne,
)

export default adminClassRouter;