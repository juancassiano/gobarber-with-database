import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppoitmentsRepository from '../repositories/AppoitmentsRepository';
import CreateAppoitmentService from '../services/CreateAppoitmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get('/', async (request, response) => {
  const appoitmentsRepository = getCustomRepository(AppoitmentsRepository);
  const appoitments = await appoitmentsRepository.find();

  return response.json(appoitments);
});

appoitmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppoitment = new CreateAppoitmentService();

  const appoitment = await createAppoitment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appoitment);
});

export default appoitmentsRouter;
