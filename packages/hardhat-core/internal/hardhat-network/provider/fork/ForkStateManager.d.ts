/// <reference types="bn.js" />
/// <reference types="node" />
import { EIP2929StateManager } from "@ethereumjs/vm/dist/state/interface";
import { Account, Address, BN } from "ethereumjs-util";
import { JsonRpcClient } from "../../jsonrpc/client";
import { GenesisAccount } from "../node-types";
export declare class ForkStateManager implements EIP2929StateManager {
    private readonly _jsonRpcClient;
    private readonly _forkBlockNumber;
    private _state;
    private _initialStateRoot;
    private _stateRoot;
    private _stateRootToState;
    private _originalStorageCache;
    private _stateCheckpoints;
    private _contextBlockNumber;
    private _contextChanged;
    private _accessedStorage;
    private _accessedStorageReverted;
    constructor(_jsonRpcClient: JsonRpcClient, _forkBlockNumber: BN);
    initializeGenesisAccounts(genesisAccounts: GenesisAccount[]): Promise<void>;
    copy(): ForkStateManager;
    getAccount(address: Address): Promise<Account>;
    putAccount(address: Address, account: Account): Promise<void>;
    touchAccount(_address: Address): void;
    putContractCode(address: Address, value: Buffer): Promise<void>;
    getContractCode(address: Address): Promise<Buffer>;
    getContractStorage(address: Address, key: Buffer): Promise<Buffer>;
    putContractStorage(address: Address, key: Buffer, value: Buffer): Promise<void>;
    clearContractStorage(address: Address): Promise<void>;
    checkpoint(): Promise<void>;
    commit(): Promise<void>;
    revert(): Promise<void>;
    getStateRoot(): Promise<Buffer>;
    setStateRoot(stateRoot: Buffer): Promise<void>;
    dumpStorage(_address: Address): Promise<Record<string, string>>;
    hasGenesisState(): Promise<boolean>;
    generateCanonicalGenesis(): Promise<void>;
    generateGenesis(_initState: any): Promise<void>;
    accountIsEmpty(address: Address): Promise<boolean>;
    cleanupTouchedAccounts(): Promise<void>;
    setBlockContext(stateRoot: Buffer, blockNumber: BN, irregularState?: Buffer): void;
    restoreForkBlockContext(stateRoot: Buffer): void;
    accountExists(_address: Address): never;
    deleteAccount(address: Address): Promise<void>;
    clearOriginalStorageCache(): void;
    getOriginalContractStorage(address: Address, key: Buffer): Promise<Buffer>;
    isWarmedAddress(address: Buffer): boolean;
    addWarmedAddress(address: Buffer): void;
    isWarmedStorage(address: Buffer, slot: Buffer): boolean;
    addWarmedStorage(address: Buffer, slot: Buffer): void;
    clearWarmedAccounts(): void;
    private _putAccount;
    private _setStateRoot;
}
//# sourceMappingURL=ForkStateManager.d.ts.map