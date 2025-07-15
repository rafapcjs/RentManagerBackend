import { Contract } from '../../entities/Contract';
import { IContractRepository } from '../../../interfaces/repositories/IContractRepository';
import { ITenantRepository } from '../../../interfaces/repositories/ITenantRepository';
import { IPropertyRepository } from '../../../interfaces/repositories/IPropertyRepository';
import { PropertyStatus } from '../../constants/PropertyConstants';
import { CreateContractDto } from '../../../application/dtos';

export class CreateContract {
  constructor(
    private contractRepository: IContractRepository,
    private tenantRepository: ITenantRepository,
    private propertyRepository: IPropertyRepository
  ) {}

  async execute(dto: CreateContractDto): Promise<Contract> {
    const errors = dto.validate();
    if (errors.length > 0) {
      throw new Error(`Validation errors: ${errors.join(', ')}`);
    }

    const tenant = await this.tenantRepository.getByDni(dto.dni);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    const property = await this.propertyRepository.getById(dto.propertyId);
    if (!property) {
      throw new Error('Property not found');
    }

    if (property.estado !== PropertyStatus.DISPONIBLE) {
      throw new Error('Property is not available');
    }

    const existingContract = await this.contractRepository.findByDniAndPropertyId(
      dto.dni, 
      dto.propertyId
    );
    if (existingContract && existingContract.active) {
      throw new Error('Active contract already exists for this tenant and property');
    }

    const domainData = dto.toDomain();
    const contract = Contract.fromCreateDto(domainData);
    
    const dateErrors = contract.validateDates();
    if (dateErrors.length > 0) {
      throw new Error(`Date validation errors: ${dateErrors.join(', ')}`);
    }

    const createdContract = await this.contractRepository.create(contract);

    property.estado = PropertyStatus.ARRENDADA;
    await this.propertyRepository.update(dto.propertyId, property);

    return createdContract;
  }
}
