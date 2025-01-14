declare interface GanacheOptions {
    url: string;
    keepAliveTimeout?: number;
    accountKeysPath?: string;
    accounts?: object[];
    allowUnlimitedContractSize?: boolean;
    blockTime?: number;
    dbPath?: string;
    debug?: boolean;
    defaultBalanceEther?: number;
    fork?: string | object;
    forkBlockNumber?: string | number;
    gasLimit?: number;
    gasPrice?: string | number;
    hardfork?: "byzantium" | "constantinople" | "petersburg" | "istanbul" | "muirGlacier";
    hdPath?: string;
    hostname?: string;
    locked?: boolean;
    logger?: {
        log(msg: string): void;
    };
    mnemonic?: string;
    networkId?: number;
    port?: number;
    seed?: any;
    time?: any;
    totalAccounts?: number;
    unlockedAccounts?: string[];
    verbose?: boolean;
    vmErrorsOnRPCResponse?: boolean;
    ws?: boolean;
}
export declare class GanacheService {
    static error?: Error;
    static optionValidator: any;
    static getDefaultOptions(): GanacheOptions;
    static create(options: any): Promise<GanacheService>;
    private readonly _server;
    private readonly _options;
    private constructor();
    startServer(): Promise<void>;
    stopServer(): Promise<void>;
    private _validateAndTransformOptions;
    private _registerSystemErrorsHandlers;
    private _checkForServiceErrors;
    private _snakeCase;
}
export {};
//# sourceMappingURL=ganache-service.d.ts.map