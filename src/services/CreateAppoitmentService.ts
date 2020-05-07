import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appoitment from '../models/Appoitment';
import AppoitmentsRepository from '../repositories/AppoitmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppoitmentService {
  public async execute({ date, provider_id }: Request): Promise<Appoitment> {
    const appoitmentsRepository = getCustomRepository(AppoitmentsRepository);

    const appoitmentDate = startOfHour(date);

    const findAppoitmentInSameDate = await appoitmentsRepository.findByDate(
      appoitmentDate
    );

    if (findAppoitmentInSameDate) {
      throw new AppError('This appoitment is already booked');
    }

    const appoitment = appoitmentsRepository.create({
      provider_id,
      date: appoitmentDate,
    });

    await appoitmentsRepository.save(appoitment);

    return appoitment;
  }
}

export default CreateAppoitmentService;
