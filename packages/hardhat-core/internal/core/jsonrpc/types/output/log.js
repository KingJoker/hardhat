"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpcLog = void 0;
const t = __importStar(require("io-ts"));
const io_ts_1 = require("../../../../util/io-ts");
const base_types_1 = require("../base-types");
exports.rpcLog = t.type({
    transactionIndex: io_ts_1.nullable(base_types_1.rpcQuantity),
    transactionHash: io_ts_1.nullable(base_types_1.rpcHash),
    blockHash: io_ts_1.nullable(base_types_1.rpcHash),
    blockNumber: io_ts_1.nullable(base_types_1.rpcQuantity),
    address: base_types_1.rpcAddress,
    data: base_types_1.rpcData,
    topics: t.array(base_types_1.rpcData, "RpcData Array"),
}, "RpcLog");
//# sourceMappingURL=log.js.map