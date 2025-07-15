export class PaginatedResponseDto<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  
  constructor(
    data: T[],
    currentPage: number,
    totalPages: number,
    totalItems: number,
    itemsPerPage: number
  ) {
    this.data = data;
    this.pagination = {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1
    };
  }

  // Método estático para crear desde resultado paginado
  static fromPaginatedResult<T>(result: any, mapFunction: (item: any) => T): PaginatedResponseDto<T> {
    const mappedData = result.data.map(mapFunction);
    
    return new PaginatedResponseDto(
      mappedData,
      result.pagination.currentPage,
      result.pagination.totalPages,
      result.pagination.totalItems,
      result.pagination.itemsPerPage
    );
  }

  // Convertir a objeto plano para JSON
  toJSON(): any {
    return {
      data: this.data,
      pagination: this.pagination
    };
  }
}
