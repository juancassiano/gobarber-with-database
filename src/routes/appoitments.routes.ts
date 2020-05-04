import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppoitmentsRepository from '../repositories/AppoitmentsRepository';
import CreateAppoitmentService from '../services/CreateAppoitmentService';

const appoitmentsRouter = Router();

appoitmentsRouter.get('/', async (request, response) => {
  const appoitmentsRepository = getCustomRepository(AppoitmentsRepository);
  const appoitments = await appoitmentsRepository.find();

  return response.json(appoitments);
});

appoitmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppoitment = new CreateAppoitmentService();

    const appoitment = await createAppoitment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appoitment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appoitmentsRouter;
