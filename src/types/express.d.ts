import { PaginationOptions } from '../interfaces/common/Pagination';

declare global {
  namespace Express {
    interface Request {
      pagination?: PaginationOptions;
    }
  }
}

export {};
