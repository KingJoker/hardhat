import { EthereumProvider } from "hardhat/types";
export interface EtherscanURLs {
    apiURL: string;
    browserURL: string;
}
export declare function getEtherscanEndpoints(provider: EthereumProvider, networkName: string): Promise<EtherscanURLs>;
export declare function retrieveContractBytecode(address: string, provider: EthereumProvider, networkName: string): Promise<string>;
//# sourceMappingURL=prober.d.ts.map