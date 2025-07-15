import { Contract } from '../../entities/Contract';
import { IContractRepository } from '../../../interfaces/repositories/IContractRepository';

export class GetContractById {
  constructor(private contractRepository: IContractRepository) {}

  async execute(id: number): Promise<Contract | null> {
    return await this.contractRepository.getById(id);
  }
}
