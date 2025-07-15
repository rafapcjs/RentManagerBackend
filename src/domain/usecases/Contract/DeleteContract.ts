import { IContractRepository } from '../../../interfaces/repositories/IContractRepository';
import { IPropertyRepository } from '../../../interfaces/repositories/IPropertyRepository';
import { PropertyStatus } from '../../constants/PropertyConstants';

export class DeleteContract {
  constructor(
    private contractRepository: IContractRepository,
    private propertyRepository: IPropertyRepository
  ) {}

  async execute(id: number): Promise<void> {
    const existingContract = await this.contractRepository.getById(id);
    if (!existingContract) {
      throw new Error('Contract not found');
    }

    if (existingContract.active) {
      const property = await this.propertyRepository.getById(existingContract.property_id);
      if (property) {
        property.estado = PropertyStatus.DISPONIBLE;
        await this.propertyRepository.update(existingContract.property_id, property);
      }
    }

    await this.contractRepository.delete(id);
  }
}
