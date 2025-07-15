"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProperty = exports.UpdateProperty = exports.CreateProperty = exports.GetPropertyById = exports.GetAllProperties = void 0;
// Property Use Cases exports
var GetAllProperties_1 = require("./GetAllProperties");
Object.defineProperty(exports, "GetAllProperties", { enumerable: true, get: function () { return GetAllProperties_1.GetAllProperties; } });
var GetPropertyById_1 = require("./GetPropertyById");
Object.defineProperty(exports, "GetPropertyById", { enumerable: true, get: function () { return GetPropertyById_1.GetPropertyById; } });
var CreateProperty_1 = require("./CreateProperty");
Object.defineProperty(exports, "CreateProperty", { enumerable: true, get: function () { return CreateProperty_1.CreateProperty; } });
var UpdateProperty_1 = require("./UpdateProperty");
Object.defineProperty(exports, "UpdateProperty", { enumerable: true, get: function () { return UpdateProperty_1.UpdateProperty; } });
var DeleteProperty_1 = require("./DeleteProperty");
Object.defineProperty(exports, "DeleteProperty", { enumerable: true, get: function () { return DeleteProperty_1.DeleteProperty; } });
