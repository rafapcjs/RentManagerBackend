import { Contract } from '../../entities/Contract';
import { IContractRepository } from '../../../interfaces/repositories/IContractRepository';
import { ITenantRepository } from '../../../interfaces/repositories/ITenantRepository';
import { IPropertyRepository } from '../../../interfaces/repositories/IPropertyRepository';
import { PropertyStatus } from '../../constants/PropertyConstants';
import { UpdateContractDto } from '../../../application/dtos';

export class UpdateContract {
  constructor(
    private contractRepository: IContractRepository,
    private tenantRepository: ITenantRepository,
    private propertyRepository: IPropertyRepository
  ) {}

  async execute(id: number, dto: UpdateContractDto): Promise<Contract> {
    const errors = dto.validate();
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(', ')}`);
    }

    const existingContract = await this.contractRepository.getById(id);
    if (!existingContract) {
      throw new Error('Contract not found');
    }

    const domainData = dto.toDomain();
    
    const updatedContract = new Contract(
      existingContract.dni,
      existingContract.property_id,
      domainData.start_date || existingContract.start_date,
      domainData.end_date || existingContract.end_date,
      domainData.monthly_value || existingContract.monthly_value,
      domainData.active !== undefined ? domainData.active : existingContract.active,
      domainData.images || existingContract.images
    );

    const dateErrors = updatedContract.validateDates();
    if (dateErrors.length > 0) {
      throw new Error(`Date validation errors: ${dateErrors.join(', ')}`);
    }

    if (domainData.active === false && existingContract.active) {
      const property = await this.propertyRepository.getById(existingContract.property_id);
      if (property) {
        property.estado = PropertyStatus.DISPONIBLE;
        await this.propertyRepository.update(existingContract.property_id, property);
      }
    }

    if (domainData.active === true && !existingContract.active) {
      const property = await this.propertyRepository.getById(existingContract.property_id);
      if (property && property.estado !== PropertyStatus.DISPONIBLE) {
        throw new Error('Property is not available');
      }
      if (property) {
        property.estado = PropertyStatus.ARRENDADA;
        await this.propertyRepository.update(existingContract.property_id, property);
      }
    }

    const result = await this.contractRepository.update(id, updatedContract);
    if (!result) {
      throw new Error('Failed to update contract');
    }

    return result;
  }
}
