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
exports.GanacheOptionsTi = void 0;
/**
 * This module was automatically generated by `ts-interface-builder`
 */
const t = __importStar(require("ts-interface-checker"));
exports.GanacheOptionsTi = t.iface([], {
    url: "string",
    keepAliveTimeout: t.opt("number"),
    accountKeysPath: t.opt("string"),
    accounts: t.opt(t.array("object")),
    allowUnlimitedContractSize: t.opt("boolean"),
    blockTime: t.opt("number"),
    dbPath: t.opt("string"),
    debug: t.opt("boolean"),
    defaultBalanceEther: t.opt("number"),
    fork: t.opt(t.union("string", "object")),
    forkBlockNumber: t.opt(t.union("string", "number")),
    gasLimit: t.opt("number"),
    gasPrice: t.opt(t.union("string", "number")),
    hardfork: t.opt(t.union(t.lit("byzantium"), t.lit("constantinople"), t.lit("petersburg"), t.lit("istanbul"), t.lit("muirGlacier"))),
    hdPath: t.opt("string"),
    hostname: t.opt("string"),
    locked: t.opt("boolean"),
    logger: t.opt(t.iface([], {
        log: t.func("void", t.param("msg", "string")),
    })),
    mnemonic: t.opt("string"),
    network_id: t.opt("number"),
    networkId: t.opt("number"),
    port: t.opt("number"),
    seed: t.opt("any"),
    time: t.opt("any"),
    totalAccounts: t.opt("number"),
    unlockedAccounts: t.opt(t.array("string")),
    verbose: t.opt("boolean"),
    vmErrorsOnRPCResponse: t.opt("boolean"),
    ws: t.opt("boolean"),
});
const exportedTypeSuite = {
    GanacheOptionsTi: exports.GanacheOptionsTi,
};
exports.default = exportedTypeSuite;
//# sourceMappingURL=ganache-options-ti.js.map