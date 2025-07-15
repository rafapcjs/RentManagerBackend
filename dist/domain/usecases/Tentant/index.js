"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTenant = exports.UpdateTenant = exports.CreateTenant = exports.GetTenantByDni = exports.GetAllTenants = void 0;
// Use Cases exports
var GetAllTenants_1 = require("./GetAllTenants");
Object.defineProperty(exports, "GetAllTenants", { enumerable: true, get: function () { return GetAllTenants_1.GetAllTenants; } });
var GetTenantByDni_1 = require("./GetTenantByDni");
Object.defineProperty(exports, "GetTenantByDni", { enumerable: true, get: function () { return GetTenantByDni_1.GetTenantByDni; } });
var CreateTenant_1 = require("./CreateTenant");
Object.defineProperty(exports, "CreateTenant", { enumerable: true, get: function () { return CreateTenant_1.CreateTenant; } });
var UpdateTenant_1 = require("./UpdateTenant");
Object.defineProperty(exports, "UpdateTenant", { enumerable: true, get: function () { return UpdateTenant_1.UpdateTenant; } });
var DeleteTenant_1 = require("./DeleteTenant");
Object.defineProperty(exports, "DeleteTenant", { enumerable: true, get: function () { return DeleteTenant_1.DeleteTenant; } });
