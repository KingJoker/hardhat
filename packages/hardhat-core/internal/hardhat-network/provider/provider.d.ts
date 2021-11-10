/// <reference types="bn.js" />
/// <reference types="node" />
import { BN } from "ethereumjs-util";
import { EventEmitter } from "events";
import type { Artifacts, BoundExperimentalHardhatNetworkMessageTraceHook, EIP1193Provider, RequestArguments } from "../../../types";
import { ModulesLogger } from "./modules/logger";
import { ForkConfig, GenesisAccount, IntervalMiningConfig } from "./node-types";
export declare class HardhatNetworkProvider extends EventEmitter implements EIP1193Provider {
    private readonly _hardfork;
    private readonly _networkName;
    private readonly _chainId;
    private readonly _networkId;
    private readonly _blockGasLimit;
    private readonly _initialBaseFeePerGas;
    private readonly _minGasPrice;
    private readonly _throwOnTransactionFailures;
    private readonly _throwOnCallFailures;
    private readonly _automine;
    private readonly _intervalMining;
    private readonly _logger;
    private readonly _genesisAccounts;
    private readonly _artifacts?;
    private readonly _allowUnlimitedContractSize;
    private readonly _initialDate?;
    private readonly _experimentalHardhatNetworkMessageTraceHooks;
    private _forkConfig?;
    private readonly _forkCachePath?;
    private _common?;
    private _node?;
    private _ethModule?;
    private _netModule?;
    private _web3Module?;
    private _evmModule?;
    private _hardhatModule?;
    private _debugModule?;
    private _personalModule?;
    private readonly _mutex;
    constructor(_hardfork: string, _networkName: string, _chainId: number, _networkId: number, _blockGasLimit: number, _initialBaseFeePerGas: number | undefined, _minGasPrice: BN, _throwOnTransactionFailures: boolean, _throwOnCallFailures: boolean, _automine: boolean, _intervalMining: IntervalMiningConfig, _logger: ModulesLogger, _genesisAccounts?: GenesisAccount[], _artifacts?: Artifacts | undefined, _allowUnlimitedContractSize?: boolean, _initialDate?: Date | undefined, _experimentalHardhatNetworkMessageTraceHooks?: BoundExperimentalHardhatNetworkMessageTraceHook[], _forkConfig?: ForkConfig | undefined, _forkCachePath?: string | undefined);
    request(args: RequestArguments): Promise<unknown>;
    private _sendWithLogging;
    private _send;
    private _init;
    private _makeTracingConfig;
    private _makeMiningTimer;
    private _reset;
    private _forwardNodeEvents;
    private _stopForwardingNodeEvents;
    private _ethEventListener;
    private _emitLegacySubscriptionEvent;
    private _emitEip1193SubscriptionEvent;
}
//# sourceMappingURL=provider.d.ts.map