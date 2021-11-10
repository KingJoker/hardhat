"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cbor_1 = require("cbor");
const chai_1 = require("chai");
const bytecode_1 = require("../../../src/solc/bytecode");
const metadata_1 = require("../../../src/solc/metadata");
describe("Compiler bytecode and deployed bytecode matching", () => {
    describe("with a simple standalone contract", () => {
        // v0.4.12 is the minimum solc version that can be run with hardhat out of the box.
        it("matches bytecode emitted by solc v0.4.12", async () => {
            const contract = {
                contractName: "TestContract",
                runtimeBytecode: "0x60606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313bdfacd1461003e575b600080fd5b341561004957600080fd5b6100516100cd565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100925780820151818401525b602081019050610076565b50505050905090810190601f1680156100bf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d5610176565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561016b5780601f106101405761010080835404028352916020019161016b565b820191906000526020600020905b81548152906001019060200180831161014e57829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a723058201c0fc1b1566b6243fc07daa6a27c042ed8bdb3c0bbf4d9d2223339f21299056b0029",
                deployedBytecode: "0x60606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313bdfacd1461003e575b600080fd5b341561004957600080fd5b6100516100cd565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100925780820151818401525b602081019050610076565b50505050905090810190601f1680156100bf5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d5610176565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561016b5780601f106101405761010080835404028352916020019161016b565b820191906000526020600020905b81548152906001019060200180831161014e57829003601f168201915b505050505090505b90565b6020604051908101604052806000815250905600a165627a7a723058201c0fc1b1566b6243fc07daa6a27c042ed8bdb3c0bbf4d9d2223339f21299056b0029",
                solcVersion: "0.4.12",
                linkReferences: {},
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
        // v0.7.0 is the latest compiler milestone.
        it("matches bytecode emitted by solc v0.7.0", async () => {
            const contract = {
                contractName: "TestContract",
                runtimeBytecode: "0x608060405234801561001057600080fd5b506004361061002b5760003560e01c806313bdfacd14610030575b600080fd5b6100386100b3565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561007857808201518184015260208101905061005d565b50505050905090810190601f1680156100a55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b606060018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561014b5780601f106101205761010080835404028352916020019161014b565b820191906000526020600020905b81548152906001019060200180831161012e57829003601f168201915b505050505090509056fea2646970667358221220981f0e56fe0654616c8fd35f98d9ac6b2a7f0882184f93226486adfca553caef64736f6c63430007000033",
                deployedBytecode: "0x608060405234801561001057600080fd5b506004361061002b5760003560e01c806313bdfacd14610030575b600080fd5b6100386100b3565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561007857808201518184015260208101905061005d565b50505050905090810190601f1680156100a55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b606060018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561014b5780601f106101205761010080835404028352916020019161014b565b820191906000526020600020905b81548152906001019060200180831161012e57829003601f168201915b505050505090509056fea2646970667358221220981f0e56fe0654616c8fd35f98d9ac6b2a7f0882184f93226486adfca553caef64736f6c63430007000033",
                solcVersion: "0.7.0",
                linkReferences: {},
                immutableReferences: {},
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
                immutableReferences: contract.immutableReferences,
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
        it("matches bytecode with different metadata", async () => {
            const contract = {
                contractName: "TestContract",
                runtimeBytecode: "0x608060405234801561001057600080fd5b506004361061002b5760003560e01c806313bdfacd14610030575b600080fd5b6100386100b3565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561007857808201518184015260208101905061005d565b50505050905090810190601f1680156100a55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b606060018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561014b5780601f106101205761010080835404028352916020019161014b565b820191906000526020600020905b81548152906001019060200180831161012e57829003601f168201915b505050505090509056fea2646970667358221220981f0e56fe0654616c8fd35f98d9ac6b2a7f0882184f93226486adfca553caef64736f6c63430007000033",
                deployedBytecode: "0x608060405234801561001057600080fd5b506004361061002b5760003560e01c806313bdfacd14610030575b600080fd5b6100386100b3565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561007857808201518184015260208101905061005d565b50505050905090810190601f1680156100a55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b606060018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561014b5780601f106101205761010080835404028352916020019161014b565b820191906000526020600020905b81548152906001019060200180831161012e57829003601f168201915b505050505090509056fea2646970667358221220981f0e56fe0654616c8fd35f98d9ac6b2a7f0882184f93226486adfca553caef64736f6c63430007000033",
                solcVersion: "0.7.0",
                linkReferences: {},
                immutableReferences: {},
            };
            const deployedBytecodeHex = contract.deployedBytecode.slice(2);
            const deployedBytecode = new bytecode_1.Bytecode(deployedBytecodeHex);
            const mockSolcMetadataMapping = {
                solc: Buffer.from([0, 7, 0]),
                someData: "a hash",
                moreData: 42,
                mysteriousString: "mystery",
            };
            const mockMetadata = Buffer.from(cbor_1.encode(mockSolcMetadataMapping));
            const length = Buffer.alloc(2);
            length.writeUInt16BE(mockMetadata.length, 0);
            const deployedMetadataSectionLength = metadata_1.getSolcMetadataSectionLength(Buffer.from(deployedBytecodeHex, "hex"));
            const deployedBytecodeTrimmed = deployedBytecodeHex.slice(0, deployedBytecodeHex.length - deployedMetadataSectionLength * 2);
            const bytecodeWithNewMetadata = [
                deployedBytecodeTrimmed,
                mockMetadata.toString("hex"),
                length.toString("hex"),
            ].join("");
            const contractSymbols = {
                object: bytecodeWithNewMetadata,
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
                immutableReferences: contract.immutableReferences,
            };
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
    });
    describe("with a library contract", () => {
        it("matches bytecode with library call protection", async () => {
            const contract = {
                contractName: "TestLibrary",
                runtimeBytecode: "0x730000000000000000000000000000000000000000301460806040526004361060335760003560e01c806305b8c7c2146038575b600080fd5b818015604357600080fd5b50606d60048036036020811015605857600080fd5b81019080803590602001909291905050506083565b6040518082815260200191505060405180910390f35b600060028202905091905056fea2646970667358221220783581f95b347b5783979ebe803f2e6cccf03e34345f61ba312b69f4205cf8f864736f6c63430007000033",
                deployedBytecode: "0x737c2c195cd6d34b8f845992d380aadb2730bb9c6f301460806040526004361060335760003560e01c806305b8c7c2146038575b600080fd5b818015604357600080fd5b50606d60048036036020811015605857600080fd5b81019080803590602001909291905050506083565b6040518082815260200191505060405180910390f35b600060028202905091905056fea2646970667358221220783581f95b347b5783979ebe803f2e6cccf03e34345f61ba312b69f4205cf8f864736f6c63430007000033",
                solcVersion: "0.7.0",
                linkReferences: {},
                immutableReferences: {},
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
                immutableReferences: contract.immutableReferences,
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
    });
    describe("with a contract that has one library link", () => {
        // v0.4.12 is the minimum solc version that can be run with hardhat out of the box.
        it("matches bytecode emitted by solc v0.4.12", async () => {
            const contract = {
                contractName: "TestContractLib",
                runtimeBytecode: "0x60606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313bdfacd146100495780638271eeaf146100d8575b600080fd5b341561005457600080fd5b61005c610101565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009d5780820151818401525b602081019050610081565b50505050905090810190601f1680156100ca5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156100e357600080fd5b6100eb6101aa565b6040518082815260200191505060405180910390f35b610109610247565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561019f5780601f106101745761010080835404028352916020019161019f565b820191906000526020600020905b81548152906001019060200180831161018257829003601f168201915b505050505090505b90565b60008073__contracts/solc-0.4/TestContractLib.s__6305b8c7c26000546000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561022257600080fd5b6102c65a03f4151561023357600080fd5b5050506040518051905090508091505b5090565b6020604051908101604052806000815250905600a165627a7a72305820aefc0232efc09ebbe3e36f9f34aa7b11dbf1c9b1477458297c27bc518ef4b7260029",
                deployedBytecode: "0x60606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313bdfacd146100495780638271eeaf146100d8575b600080fd5b341561005457600080fd5b61005c610101565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561009d5780820151818401525b602081019050610081565b50505050905090810190601f1680156100ca5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156100e357600080fd5b6100eb6101aa565b6040518082815260200191505060405180910390f35b610109610247565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561019f5780601f106101745761010080835404028352916020019161019f565b820191906000526020600020905b81548152906001019060200180831161018257829003601f168201915b505050505090505b90565b60008073a2d917811698d92d7ff80ed988775f274a51b4356305b8c7c26000546000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561022257600080fd5b6102c65a03f4151561023357600080fd5b5050506040518051905090508091505b5090565b6020604051908101604052806000815250905600a165627a7a72305820aefc0232efc09ebbe3e36f9f34aa7b11dbf1c9b1477458297c27bc518ef4b7260029",
                solcVersion: "0.4.12",
                linkReferences: {
                    "contracts/solc-0.4/TestContractLib.sol": {
                        TestLibrary: [{ length: 20, start: 431 }],
                    },
                },
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
        // v0.5.0 changes library placeholders.
        it("matches bytecode emitted by solc v0.5.0", async () => {
            const contract = {
                contractName: "TestContractLib",
                runtimeBytecode: "0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313bdfacd146100515780638271eeaf146100e1575b600080fd5b34801561005d57600080fd5b5061006661010c565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a657808201518184015260208101905061008b565b50505050905090810190601f1680156100d35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100ed57600080fd5b506100f66101ae565b6040518082815260200191505060405180910390f35b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101a45780601f10610179576101008083540402835291602001916101a4565b820191906000526020600020905b81548152906001019060200180831161018757829003601f168201915b5050505050905090565b60008073__$6a6d6c8265ef66eeba50e08b8479718805$__6305b8c7c26000546040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15801561021e57600080fd5b505af4158015610232573d6000803e3d6000fd5b505050506040513d602081101561024857600080fd5b81019080805190602001909291905050509050809150509056fea165627a7a72305820b6e52b7d6d8180f73be6cfafac158e2b8df5b75a979d59f89b37740adfad5a350029",
                deployedBytecode: "0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313bdfacd146100515780638271eeaf146100e1575b600080fd5b34801561005d57600080fd5b5061006661010c565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a657808201518184015260208101905061008b565b50505050905090810190601f1680156100d35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100ed57600080fd5b506100f66101ae565b6040518082815260200191505060405180910390f35b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101a45780601f10610179576101008083540402835291602001916101a4565b820191906000526020600020905b81548152906001019060200180831161018757829003601f168201915b5050505050905090565b60008073a2d917811698d92d7ff80ed988775f274a51b4356305b8c7c26000546040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15801561021e57600080fd5b505af4158015610232573d6000803e3d6000fd5b505050506040513d602081101561024857600080fd5b81019080805190602001909291905050509050809150509056fea165627a7a72305820b6e52b7d6d8180f73be6cfafac158e2b8df5b75a979d59f89b37740adfad5a350029",
                solcVersion: "0.5.0",
                linkReferences: {
                    "contracts/solc-0.5/TestContractLib.sol": {
                        TestLibrary: [{ length: 20, start: 435 }],
                    },
                },
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
        // v0.7.0 is the latest compiler milestone.
        it("matches bytecode emitted by solc v0.7.0", async () => {
            const contract = {
                contractName: "TestContractLib",
                runtimeBytecode: "0x608060405234801561001057600080fd5b50600436106100365760003560e01c806313bdfacd1461003b5780638271eeaf146100be575b600080fd5b6100436100dc565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610083578082015181840152602081019050610068565b50505050905090810190601f1680156100b05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100c661017e565b6040518082815260200191505060405180910390f35b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101745780601f1061014957610100808354040283529160200191610174565b820191906000526020600020905b81548152906001019060200180831161015757829003601f168201915b5050505050905090565b60008073__$cd1f84d311e2e094fecba501213ce5942a$__6305b8c7c26000546040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b1580156101d257600080fd5b505af41580156101e6573d6000803e3d6000fd5b505050506040513d60208110156101fc57600080fd5b81019080805190602001909291905050509050809150509056fea2646970667358221220e4213002e70939709587ff1b8efe998ef9e494451679a4b97e5ea0bb724a168e64736f6c63430007000033",
                deployedBytecode: "0x608060405234801561001057600080fd5b50600436106100365760003560e01c806313bdfacd1461003b5780638271eeaf146100be575b600080fd5b6100436100dc565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610083578082015181840152602081019050610068565b50505050905090810190601f1680156100b05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100c661017e565b6040518082815260200191505060405180910390f35b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101745780601f1061014957610100808354040283529160200191610174565b820191906000526020600020905b81548152906001019060200180831161015757829003601f168201915b5050505050905090565b60008073a2d917811698d92d7ff80ed988775f274a51b4356305b8c7c26000546040518263ffffffff1660e01b81526004018082815260200191505060206040518083038186803b1580156101d257600080fd5b505af41580156101e6573d6000803e3d6000fd5b505050506040513d60208110156101fc57600080fd5b81019080805190602001909291905050509050809150509056fea2646970667358221220e4213002e70939709587ff1b8efe998ef9e494451679a4b97e5ea0bb724a168e64736f6c63430007000033",
                solcVersion: "0.7.0",
                linkReferences: {
                    "contracts/solc-0.7/TestContractLib.sol": {
                        TestLibrary: [{ length: 20, start: 387 }],
                    },
                },
                immutableReferences: {},
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
                immutableReferences: contract.immutableReferences,
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
    });
    describe("with immutable variables", () => {
        // v0.6.5 introduces immutable state variables.
        it("matches bytecode with immutables emitted by solc v0.6.5", async () => {
            const contract = {
                contractName: "TestContractImmutables",
                runtimeBytecode: "0x6080604052348015600f57600080fd5b506004361060285760003560e01c80638271eeaf14602d575b600080fd5b60336049565b6040518082815260200191505060405180910390f35b60007f000000000000000000000000000000000000000000000000000000000000000090509056fea264697066735822122074cd878c32f52c368b28d568c51feef7afcc860d22173b6610d11ee83eda42da64736f6c63430006050033",
                deployedBytecode: "0x6080604052348015600f57600080fd5b506004361060285760003560e01c80638271eeaf14602d575b600080fd5b60336049565b6040518082815260200191505060405180910390f35b60007f000000000000000000000000000000000000000000000000000000000000008c90509056fea264697066735822122074cd878c32f52c368b28d568c51feef7afcc860d22173b6610d11ee83eda42da64736f6c63430006050033",
                solcVersion: "0.6.5",
                linkReferences: {},
                immutableReferences: { "31": [{ length: 32, start: 77 }] },
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
                immutableReferences: contract.immutableReferences,
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
        // v0.7.0 is the latest compiler milestone.
        it("matches bytecode with immutables emitted by solc v0.7.0", async () => {
            const contract = {
                contractName: "TestContractImmutables",
                runtimeBytecode: "0x6080604052348015600f57600080fd5b506004361060285760003560e01c80638271eeaf14602d575b600080fd5b60336049565b6040518082815260200191505060405180910390f35b60007f000000000000000000000000000000000000000000000000000000000000000090509056fea264697066735822122035979641b3587a98a5570a858e8c6c5a56ed8faa8584486c3e75ea4e0d18c0c664736f6c63430007000033",
                deployedBytecode: "0x6080604052348015600f57600080fd5b506004361060285760003560e01c80638271eeaf14602d575b600080fd5b60336049565b6040518082815260200191505060405180910390f35b60007f000000000000000000000000000000000000000000000000000000000000008c90509056fea264697066735822122035979641b3587a98a5570a858e8c6c5a56ed8faa8584486c3e75ea4e0d18c0c664736f6c63430007000033",
                solcVersion: "0.7.0",
                linkReferences: {},
                immutableReferences: { "31": [{ length: 32, start: 77 }] },
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
                immutableReferences: contract.immutableReferences,
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
        it("matches bytecode with more than one immutable", async () => {
            const contract = {
                contractName: "TestContractTwoImmutables",
                runtimeBytecode: "0x6080604052348015600f57600080fd5b506004361060325760003560e01c80638271eeaf146037578063eca065de146053575b600080fd5b603d6085565b6040518082815260200191505060405180910390f35b605960ad565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60007f000000000000000000000000000000000000000000000000000000000000000090509056fea2646970667358221220f8f5189b769b89b88b4e8be9a55ff0ad542a56ba23c13194c270a5077624efe564736f6c63430007000033",
                deployedBytecode: "0x6080604052348015600f57600080fd5b506004361060325760003560e01c80638271eeaf146037578063eca065de146053575b600080fd5b603d6085565b6040518082815260200191505060405180910390f35b605960ad565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60007f000000000000000000000000000000000000000000000000000000000000008c905090565b60007f000000000000000000000000a2d917811698d92d7ff80ed988775f274a51b43590509056fea2646970667358221220f8f5189b769b89b88b4e8be9a55ff0ad542a56ba23c13194c270a5077624efe564736f6c63430007000033",
                solcVersion: "0.7.0",
                linkReferences: {},
                immutableReferences: {
                    "115": [{ length: 32, start: 137 }],
                    "117": [{ length: 32, start: 177 }],
                },
            };
            const contractSymbols = {
                object: contract.runtimeBytecode.slice(2),
                linkReferences: contract.linkReferences,
                opcodes: "",
                sourceMap: "",
                immutableReferences: contract.immutableReferences,
            };
            const deployedBytecode = new bytecode_1.Bytecode(contract.deployedBytecode.slice(2));
            const contractInformation = await bytecode_1.compareBytecode(deployedBytecode, contractSymbols);
            chai_1.assert.isDefined(contractInformation);
        });
    });
});
//# sourceMappingURL=bytecode.js.map