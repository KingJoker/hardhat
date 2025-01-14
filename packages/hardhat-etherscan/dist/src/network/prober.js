"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveContractBytecode = exports.getEtherscanEndpoints = void 0;
const plugins_1 = require("hardhat/plugins");
const constants_1 = require("../constants");
// See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids
var NetworkID;
(function (NetworkID) {
    NetworkID[NetworkID["MAINNET"] = 1] = "MAINNET";
    NetworkID[NetworkID["ROPSTEN"] = 3] = "ROPSTEN";
    NetworkID[NetworkID["RINKEBY"] = 4] = "RINKEBY";
    NetworkID[NetworkID["GOERLI"] = 5] = "GOERLI";
    NetworkID[NetworkID["KOVAN"] = 42] = "KOVAN";
    // Binance Smart Chain
    NetworkID[NetworkID["BSC"] = 56] = "BSC";
    NetworkID[NetworkID["BSC_TESTNET"] = 97] = "BSC_TESTNET";
    // Huobi ECO Chain
    NetworkID[NetworkID["HECO"] = 128] = "HECO";
    NetworkID[NetworkID["HECO_TESTNET"] = 256] = "HECO_TESTNET";
    // Fantom mainnet
    NetworkID[NetworkID["OPERA"] = 250] = "OPERA";
    NetworkID[NetworkID["FTM_TESTNET"] = 4002] = "FTM_TESTNET";
    // Optimistim
    NetworkID[NetworkID["OPTIMISTIC_ETHEREUM"] = 10] = "OPTIMISTIC_ETHEREUM";
    NetworkID[NetworkID["OPTIMISTIC_KOVAN"] = 69] = "OPTIMISTIC_KOVAN";
    // Polygon
    NetworkID[NetworkID["POLYGON"] = 137] = "POLYGON";
    NetworkID[NetworkID["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
    // Arbitrum
    NetworkID[NetworkID["ARBITRUM_ONE"] = 42161] = "ARBITRUM_ONE";
    NetworkID[NetworkID["ARBITRUM_TESTNET"] = 421611] = "ARBITRUM_TESTNET";
    // Avalanche
    NetworkID[NetworkID["AVALANCHE"] = 43114] = "AVALANCHE";
    NetworkID[NetworkID["AVALANCHE_FUJI_TESTNET"] = 43113] = "AVALANCHE_FUJI_TESTNET";
    //Moonriver
    NetworkID[NetworkID["MOONBASE_ALPHA"] = 1287] = "MOONBASE_ALPHA";
    NetworkID[NetworkID["MOONRIVER"] = 1285] = "MOONRIVER";
})(NetworkID || (NetworkID = {}));
const networkIDtoEndpoints = {
    [NetworkID.MAINNET]: {
        apiURL: "https://api.etherscan.io/api",
        browserURL: "https://etherscan.io",
    },
    [NetworkID.ROPSTEN]: {
        apiURL: "https://api-ropsten.etherscan.io/api",
        browserURL: "https://ropsten.etherscan.io",
    },
    [NetworkID.RINKEBY]: {
        apiURL: "https://api-rinkeby.etherscan.io/api",
        browserURL: "https://rinkeby.etherscan.io",
    },
    [NetworkID.GOERLI]: {
        apiURL: "https://api-goerli.etherscan.io/api",
        browserURL: "https://goerli.etherscan.io",
    },
    [NetworkID.KOVAN]: {
        apiURL: "https://api-kovan.etherscan.io/api",
        browserURL: "https://kovan.etherscan.io",
    },
    [NetworkID.BSC]: {
        apiURL: "https://api.bscscan.com/api",
        browserURL: "https://bscscan.com",
    },
    [NetworkID.BSC_TESTNET]: {
        apiURL: "https://api-testnet.bscscan.com/api",
        browserURL: "https://testnet.bscscan.com",
    },
    [NetworkID.HECO]: {
        apiURL: "https://api.hecoinfo.com/api",
        browserURL: "https://hecoinfo.com",
    },
    [NetworkID.HECO_TESTNET]: {
        apiURL: "https://api-testnet.hecoinfo.com/api",
        browserURL: "https://testnet.hecoinfo.com",
    },
    [NetworkID.OPERA]: {
        apiURL: "https://api.ftmscan.com/api",
        browserURL: "https://ftmscan.com",
    },
    [NetworkID.FTM_TESTNET]: {
        apiURL: "https://api-testnet.ftmscan.com/api",
        browserURL: "https://testnet.ftmscan.com",
    },
    [NetworkID.OPTIMISTIC_ETHEREUM]: {
        apiURL: "https://api-optimistic.etherscan.io/api",
        browserURL: "https://optimistic.etherscan.io/",
    },
    [NetworkID.OPTIMISTIC_KOVAN]: {
        apiURL: "https://api-kovan-optimistic.etherscan.io/api",
        browserURL: "https://kovan-optimistic.etherscan.io/",
    },
    [NetworkID.POLYGON]: {
        apiURL: "https://api.polygonscan.com/api",
        browserURL: "https://polygonscan.com",
    },
    [NetworkID.POLYGON_MUMBAI]: {
        apiURL: "https://api-testnet.polygonscan.com/api",
        browserURL: "https://mumbai.polygonscan.com/",
    },
    [NetworkID.ARBITRUM_ONE]: {
        apiURL: "https://api.arbiscan.io/api",
        browserURL: "https://arbiscan.io/",
    },
    [NetworkID.ARBITRUM_TESTNET]: {
        apiURL: "https://api-testnet.arbiscan.io/api",
        browserURL: "https://testnet.arbiscan.io/",
    },
    [NetworkID.AVALANCHE]: {
        apiURL: "https://api.snowtrace.io/api",
        browserURL: "https://snowtrace.io/",
    },
    [NetworkID.AVALANCHE_FUJI_TESTNET]: {
        apiURL: "https://api-testnet.snowtrace.io/api",
        browserURL: "https://testnet.snowtrace.io/",
    },
    [NetworkID.MOONBASE_ALPHA]: {
        apiURL: "https://api-moonbase.moonscan.io/api",
        browserURL: "https://moonbase.moonscan.io/"
    },
    [NetworkID.MOONRIVER]: {
        apiURL: "https://api-moonriver.moonscan.io/api",
        browserURL: "https://moonriver.moonscan.io/"
    }
};
async function getEtherscanEndpoints(provider, networkName) {
    if (networkName === plugins_1.HARDHAT_NETWORK_NAME) {
        throw new plugins_1.NomicLabsHardhatPluginError(constants_1.pluginName, `The selected network is ${networkName}. Please select a network supported by Etherscan.`);
    }
    const chainID = parseInt(await provider.send("eth_chainId"), 16);
    const endpoints = networkIDtoEndpoints[chainID];
    if (endpoints === undefined) {
        throw new plugins_1.NomicLabsHardhatPluginError(constants_1.pluginName, `An etherscan endpoint could not be found for this network. ChainID: ${chainID}. The selected network is ${networkName}.

Possible causes are:
  - The selected network (${networkName}) is wrong.
  - Faulty hardhat network config.`);
    }
    return endpoints;
}
exports.getEtherscanEndpoints = getEtherscanEndpoints;
async function retrieveContractBytecode(address, provider, networkName) {
    const bytecodeString = (await provider.send("eth_getCode", [
        address,
        "latest",
    ]));
    const deployedBytecode = bytecodeString.startsWith("0x")
        ? bytecodeString.slice(2)
        : bytecodeString;
    if (deployedBytecode.length === 0) {
        throw new plugins_1.NomicLabsHardhatPluginError(constants_1.pluginName, `The address ${address} has no bytecode. Is the contract deployed to this network?
The selected network is ${networkName}.`);
    }
    return deployedBytecode;
}
exports.retrieveContractBytecode = retrieveContractBytecode;
//# sourceMappingURL=prober.js.map