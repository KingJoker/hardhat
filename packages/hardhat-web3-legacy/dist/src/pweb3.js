"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisifyWeb3 = void 0;
const solidity_errors_1 = require("hardhat/internal/hardhat-network/stack-traces/solidity-errors");
const plugins_1 = require("hardhat/plugins");
const util_1 = require("util");
function promisifyWeb3(web3) {
    const WEB3_MODULES = ["eth", "db", "shh", "net", "personal", "bzz"];
    const Web3 = require("web3");
    const pweb3 = new Web3(web3.currentProvider);
    for (const module of WEB3_MODULES) {
        const originalModule = pweb3[module];
        pweb3[module] = {};
        for (const prop in web3[module]) {
            if (module === "eth" && prop === "contract") {
                continue;
            }
            const desc = Object.getOwnPropertyDescriptor(web3[module], prop);
            if (desc === undefined) {
                Object.defineProperty(pweb3[module], prop, {
                    get: () => {
                        throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-web3-legacy", `pweb3.${module}.${prop} is not supported.`);
                    },
                });
            }
            else if (desc.get !== undefined) {
                Object.defineProperty(pweb3[module], prop, {
                    get: () => {
                        throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-web3-legacy", "pweb3 doesn't support synchronous calls.");
                    },
                });
            }
            else if (web3[module][prop] instanceof Function) {
                pweb3[module][prop] = async (...args) => {
                    return solidity_errors_1.wrapWithSolidityErrorsCorrection(() => {
                        const pfied = util_1.promisify(web3[module][prop].bind(web3[module]));
                        return pfied(...args);
                    }, 3);
                };
            }
            else {
                pweb3[module][prop] = originalModule[prop];
            }
        }
    }
    pweb3.eth.contract = (abi) => {
        const contractFactory = web3.eth.contract(abi);
        const originalNew = contractFactory.new;
        contractFactory.new = (...args) => {
            if (typeof args[args.length - 1] === "function") {
                throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-web3-legacy", "pweb3.eth.ContractFactory.new doesn't support callbacks.");
            }
            // Web3 calls twice to the callback. Once before finishing to initialize
            // the contract.
            let alreadyCalledOnce = false;
            return solidity_errors_1.wrapWithSolidityErrorsCorrection(() => {
                const pfied = () => new Promise((resolve, reject) => {
                    originalNew.apply(contractFactory, [
                        ...args,
                        (err, contract) => {
                            if (err !== undefined && err !== null) {
                                reject(err);
                                return;
                            }
                            if (!alreadyCalledOnce) {
                                alreadyCalledOnce = true;
                                return;
                            }
                            promisifyContract(contract, abi);
                            resolve(contract);
                        },
                    ]);
                });
                return pfied();
            }, 3);
        };
        contractFactory.new.getData = originalNew.getData;
        const originalAt = contractFactory.at;
        contractFactory.at = (address, callback) => {
            if (callback === undefined) {
                const contract = originalAt.call(contractFactory, address);
                promisifyContract(contract, abi);
                return contract;
            }
            throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-web3-legacy", "pweb3.eth.ContractFactory.at doesn't support callbacks.");
        };
        return contractFactory;
    };
    return pweb3;
}
exports.promisifyWeb3 = promisifyWeb3;
function promisifyContract(contract, abi) {
    for (const abiElem of abi) {
        if (abiElem.type === "function") {
            const original = contract[abiElem.name];
            contract[abiElem.name] = async (...args) => {
                return solidity_errors_1.wrapWithSolidityErrorsCorrection(() => {
                    const pfied = util_1.promisify(original.bind(contract));
                    return pfied(...args);
                }, 3);
            };
            contract[abiElem.name].getData = original.getData.bind(original);
        }
    }
}
//# sourceMappingURL=pweb3.js.map