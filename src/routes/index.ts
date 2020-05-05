import { Router } from 'express';

import appoitmentsRouter from './appoitments.routes';
import usersRouter from './users.Routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appoitments', appoitmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
