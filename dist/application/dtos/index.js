"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractResponseDto = exports.UpdateContractDto = exports.CreateContractDto = exports.PropertyResponseDto = exports.UpdatePropertyDto = exports.CreatePropertyDto = exports.TenantResponseDto = exports.UpdateTenantDto = exports.CreateTenantDto = exports.PaginationDto = exports.PaginatedResponseDto = void 0;
// Common DTOs
var PaginatedResponseDto_1 = require("./PaginatedResponseDto");
Object.defineProperty(exports, "PaginatedResponseDto", { enumerable: true, get: function () { return PaginatedResponseDto_1.PaginatedResponseDto; } });
var PaginationDto_1 = require("./PaginationDto");
Object.defineProperty(exports, "PaginationDto", { enumerable: true, get: function () { return PaginationDto_1.PaginationDto; } });
// Tenant DTOs
var TenantDtos_1 = require("./TenantDtos");
Object.defineProperty(exports, "CreateTenantDto", { enumerable: true, get: function () { return TenantDtos_1.CreateTenantDto; } });
Object.defineProperty(exports, "UpdateTenantDto", { enumerable: true, get: function () { return TenantDtos_1.UpdateTenantDto; } });
Object.defineProperty(exports, "TenantResponseDto", { enumerable: true, get: function () { return TenantDtos_1.TenantResponseDto; } });
// Property DTOs
var PropertyDtos_1 = require("./PropertyDtos");
Object.defineProperty(exports, "CreatePropertyDto", { enumerable: true, get: function () { return PropertyDtos_1.CreatePropertyDto; } });
Object.defineProperty(exports, "UpdatePropertyDto", { enumerable: true, get: function () { return PropertyDtos_1.UpdatePropertyDto; } });
Object.defineProperty(exports, "PropertyResponseDto", { enumerable: true, get: function () { return PropertyDtos_1.PropertyResponseDto; } });
// Contract DTOs
var ContractDtos_1 = require("./ContractDtos");
Object.defineProperty(exports, "CreateContractDto", { enumerable: true, get: function () { return ContractDtos_1.CreateContractDto; } });
Object.defineProperty(exports, "UpdateContractDto", { enumerable: true, get: function () { return ContractDtos_1.UpdateContractDto; } });
Object.defineProperty(exports, "ContractResponseDto", { enumerable: true, get: function () { return ContractDtos_1.ContractResponseDto; } });
