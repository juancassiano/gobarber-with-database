import { Router } from 'express';
import appoitmentsRouter from './appoitments.routes';
import usersRouter from './users.Routes';

const routes = Router();

routes.use('/appoitments', appoitmentsRouter);
routes.use('/users', usersRouter);

export default routes;
