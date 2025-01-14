"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldShowEffectiveGasPriceForHardfork = exports.shouldShowTransactionTypeForHardfork = exports.toRpcLogOutput = exports.remoteReceiptToRpcReceiptOutput = exports.getRpcReceiptOutputsFromLocalBlockExecution = exports.getRpcTransaction = exports.getRpcBlock = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const errors_1 = require("../../core/errors");
const base_types_1 = require("../../core/jsonrpc/types/base-types");
const assertions_1 = require("./utils/assertions");
const FIRST_HARDFORK_WITH_TRANSACTION_TYPE = "berlin";
const FIRST_HARDFORK_WITH_EIP1559 = "london";
/* eslint-disable @nomiclabs/hardhat-internal-rules/only-hardhat-error */
function getRpcBlock(block, totalDifficulty, showTransactionType, includeTransactions = true, pending = false) {
    const transactions = includeTransactions
        ? block.transactions.map((tx, index) => getRpcTransaction(tx, showTransactionType, block, index))
        : block.transactions.map((tx) => base_types_1.bufferToRpcData(tx.hash()));
    const output = {
        number: pending ? null : base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(block.header.number)),
        hash: pending ? null : base_types_1.bufferToRpcData(block.hash()),
        parentHash: base_types_1.bufferToRpcData(block.header.parentHash),
        // We pad this to 8 bytes because of a limitation in The Graph
        // See: https://github.com/nomiclabs/hardhat/issues/491
        nonce: pending ? null : base_types_1.bufferToRpcData(block.header.nonce, 8),
        mixHash: pending ? null : base_types_1.bufferToRpcData(block.header.mixHash, 32),
        sha3Uncles: base_types_1.bufferToRpcData(block.header.uncleHash),
        logsBloom: pending ? null : base_types_1.bufferToRpcData(block.header.bloom),
        transactionsRoot: base_types_1.bufferToRpcData(block.header.transactionsTrie),
        stateRoot: base_types_1.bufferToRpcData(block.header.stateRoot),
        receiptsRoot: base_types_1.bufferToRpcData(block.header.receiptTrie),
        miner: base_types_1.bufferToRpcData(block.header.coinbase.toBuffer()),
        difficulty: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(block.header.difficulty)),
        totalDifficulty: base_types_1.numberToRpcQuantity(totalDifficulty),
        extraData: base_types_1.bufferToRpcData(block.header.extraData),
        size: base_types_1.numberToRpcQuantity(block.serialize().length),
        gasLimit: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(block.header.gasLimit)),
        gasUsed: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(block.header.gasUsed)),
        timestamp: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(block.header.timestamp)),
        transactions,
        uncles: block.uncleHeaders.map((uh) => base_types_1.bufferToRpcData(uh.hash())),
    };
    if (block.header.baseFeePerGas) {
        output.baseFeePerGas = base_types_1.numberToRpcQuantity(block.header.baseFeePerGas);
    }
    return output;
}
exports.getRpcBlock = getRpcBlock;
function getRpcTransaction(tx, showTransactionType, block, index) {
    // only already signed transactions should be used here,
    // but there is no type in ethereumjs for that
    errors_1.assertHardhatInvariant(tx.v !== undefined, "tx should be signed");
    errors_1.assertHardhatInvariant(tx.r !== undefined, "tx should be signed");
    errors_1.assertHardhatInvariant(tx.s !== undefined, "tx should be signed");
    const isTypedTransaction = tx.type !== 0;
    const baseOutput = {
        blockHash: block === "pending" ? null : base_types_1.bufferToRpcData(block.hash()),
        blockNumber: block === "pending"
            ? null
            : base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(block.header.number)),
        from: base_types_1.bufferToRpcData(tx.getSenderAddress().toBuffer()),
        gas: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(tx.gasLimit)),
        hash: base_types_1.bufferToRpcData(tx.hash()),
        input: base_types_1.bufferToRpcData(tx.data),
        nonce: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(tx.nonce)),
        to: tx.to === undefined ? null : base_types_1.bufferToRpcData(tx.to.toBuffer()),
        transactionIndex: index !== undefined ? base_types_1.numberToRpcQuantity(index) : null,
        value: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(tx.value)),
        v: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(tx.v)),
        r: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(tx.r)),
        s: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(tx.s)),
        type: showTransactionType || isTypedTransaction
            ? base_types_1.numberToRpcQuantity(tx.transactionType)
            : undefined,
        accessList: "accessList" in tx
            ? tx.accessList.map(([address, storageKeys]) => ({
                address: ethereumjs_util_1.bufferToHex(address),
                storageKeys: storageKeys.map(ethereumjs_util_1.bufferToHex),
            }))
            : undefined,
        chainId: "chainId" in tx ? base_types_1.numberToRpcQuantity(tx.chainId) : undefined,
    };
    if ("maxFeePerGas" in tx) {
        const effectiveGasPrice = block === "pending"
            ? tx.maxFeePerGas
            : getEffectiveGasPrice(tx, block.header.baseFeePerGas);
        // EIP-1559
        return Object.assign(Object.assign({}, baseOutput), { gasPrice: base_types_1.numberToRpcQuantity(effectiveGasPrice), chainId: base_types_1.numberToRpcQuantity(tx.chainId), maxFeePerGas: base_types_1.numberToRpcQuantity(tx.maxFeePerGas), maxPriorityFeePerGas: base_types_1.numberToRpcQuantity(tx.maxPriorityFeePerGas) });
    }
    // Not EIP-1559
    return Object.assign(Object.assign({}, baseOutput), { gasPrice: base_types_1.numberToRpcQuantity(tx.gasPrice) });
}
exports.getRpcTransaction = getRpcTransaction;
function getEffectiveGasPrice(tx, baseFeePerGas) {
    const maxFeePerGas = "maxFeePerGas" in tx ? tx.maxFeePerGas : tx.gasPrice;
    const maxPriorityFeePerGas = "maxPriorityFeePerGas" in tx ? tx.maxPriorityFeePerGas : tx.gasPrice;
    // baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas)
    return baseFeePerGas.add(ethereumjs_util_1.BN.min(maxFeePerGas.sub(baseFeePerGas), maxPriorityFeePerGas));
}
function getRpcReceiptOutputsFromLocalBlockExecution(block, runBlockResult, showTransactionType) {
    const receipts = [];
    let cumulativeGasUsed = new ethereumjs_util_1.BN(0);
    for (let i = 0; i < runBlockResult.results.length; i += 1) {
        const tx = block.transactions[i];
        const { createdAddress, gasUsed } = runBlockResult.results[i];
        const receipt = runBlockResult.receipts[i];
        cumulativeGasUsed = cumulativeGasUsed.add(new ethereumjs_util_1.BN(receipt.gasUsed));
        const logs = receipt.logs.map((log, logIndex) => getRpcLogOutput(log, tx, block, i, logIndex));
        const rpcReceipt = {
            transactionHash: base_types_1.bufferToRpcData(tx.hash()),
            transactionIndex: base_types_1.numberToRpcQuantity(i),
            blockHash: base_types_1.bufferToRpcData(block.hash()),
            blockNumber: base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(block.header.number)),
            from: base_types_1.bufferToRpcData(tx.getSenderAddress().toBuffer()),
            to: tx.to === undefined ? null : base_types_1.bufferToRpcData(tx.to.toBuffer()),
            cumulativeGasUsed: base_types_1.numberToRpcQuantity(cumulativeGasUsed),
            gasUsed: base_types_1.numberToRpcQuantity(gasUsed),
            contractAddress: createdAddress !== undefined
                ? base_types_1.bufferToRpcData(createdAddress.toBuffer())
                : null,
            logs,
            logsBloom: base_types_1.bufferToRpcData(receipt.bitvector),
            // There's no way to execute an EIP-2718 tx locally if we aren't in
            // an HF >= Berlin, so this check is enough
            type: showTransactionType
                ? base_types_1.numberToRpcQuantity(tx.transactionType)
                : undefined,
        };
        if ("stateRoot" in receipt) {
            rpcReceipt.root = base_types_1.bufferToRpcData(receipt.stateRoot);
        }
        else {
            rpcReceipt.status = base_types_1.numberToRpcQuantity(receipt.status);
        }
        if (block.header.baseFeePerGas !== undefined) {
            const effectiveGasPrice = getEffectiveGasPrice(tx, block.header.baseFeePerGas);
            rpcReceipt.effectiveGasPrice = base_types_1.numberToRpcQuantity(effectiveGasPrice);
        }
        receipts.push(rpcReceipt);
    }
    return receipts;
}
exports.getRpcReceiptOutputsFromLocalBlockExecution = getRpcReceiptOutputsFromLocalBlockExecution;
function remoteReceiptToRpcReceiptOutput(receipt, tx, showTransactionType, showEffectiveGasPrice) {
    var _a;
    const isTypedTransaction = tx.type !== 0;
    const effectiveGasPrice = (_a = receipt.effectiveGasPrice) !== null && _a !== void 0 ? _a : ("gasPrice" in tx ? tx.gasPrice : undefined);
    assertions_1.assertHardhatNetworkInvariant(effectiveGasPrice !== undefined, "Receipt without effectiveGasPrice nor gasPrice in its tx");
    return {
        blockHash: base_types_1.bufferToRpcData(receipt.blockHash),
        blockNumber: base_types_1.numberToRpcQuantity(receipt.blockNumber),
        contractAddress: receipt.contractAddress !== null
            ? base_types_1.bufferToRpcData(receipt.contractAddress)
            : null,
        cumulativeGasUsed: base_types_1.numberToRpcQuantity(receipt.cumulativeGasUsed),
        from: base_types_1.bufferToRpcData(receipt.from),
        gasUsed: base_types_1.numberToRpcQuantity(receipt.gasUsed),
        logs: receipt.logs.map(toRpcLogOutput),
        logsBloom: base_types_1.bufferToRpcData(receipt.logsBloom),
        status: receipt.status !== undefined && receipt.status !== null
            ? base_types_1.numberToRpcQuantity(receipt.status)
            : undefined,
        root: receipt.root !== undefined ? base_types_1.bufferToRpcData(receipt.root) : undefined,
        to: receipt.to !== null ? base_types_1.bufferToRpcData(receipt.to) : null,
        transactionHash: base_types_1.bufferToRpcData(receipt.transactionHash),
        transactionIndex: base_types_1.numberToRpcQuantity(receipt.transactionIndex),
        type: showTransactionType || isTypedTransaction
            ? base_types_1.numberToRpcQuantity(tx.transactionType)
            : undefined,
        effectiveGasPrice: showEffectiveGasPrice || tx.type === 2
            ? base_types_1.numberToRpcQuantity(effectiveGasPrice)
            : undefined,
    };
}
exports.remoteReceiptToRpcReceiptOutput = remoteReceiptToRpcReceiptOutput;
function toRpcLogOutput(log, index) {
    return {
        removed: false,
        address: base_types_1.bufferToRpcData(log.address),
        blockHash: log.blockHash !== null ? base_types_1.bufferToRpcData(log.blockHash) : null,
        blockNumber: log.blockNumber !== null ? base_types_1.numberToRpcQuantity(log.blockNumber) : null,
        data: base_types_1.bufferToRpcData(log.data),
        logIndex: index !== undefined ? base_types_1.numberToRpcQuantity(index) : null,
        transactionIndex: log.transactionIndex !== null
            ? base_types_1.numberToRpcQuantity(log.transactionIndex)
            : null,
        transactionHash: log.transactionHash !== null
            ? base_types_1.bufferToRpcData(log.transactionHash)
            : null,
        topics: log.topics.map((topic) => base_types_1.bufferToRpcData(topic)),
    };
}
exports.toRpcLogOutput = toRpcLogOutput;
function getRpcLogOutput(log, tx, block, transactionIndex, logIndex) {
    return {
        removed: false,
        logIndex: logIndex !== undefined ? base_types_1.numberToRpcQuantity(logIndex) : null,
        transactionIndex: transactionIndex !== undefined
            ? base_types_1.numberToRpcQuantity(transactionIndex)
            : null,
        transactionHash: block !== undefined ? base_types_1.bufferToRpcData(tx.hash()) : null,
        blockHash: block !== undefined ? base_types_1.bufferToRpcData(block.hash()) : null,
        blockNumber: block !== undefined
            ? base_types_1.numberToRpcQuantity(new ethereumjs_util_1.BN(block.header.number))
            : null,
        address: base_types_1.bufferToRpcData(log[0]),
        data: base_types_1.bufferToRpcData(log[2]),
        topics: log[1].map((topic) => base_types_1.bufferToRpcData(topic)),
    };
}
function shouldShowTransactionTypeForHardfork(common) {
    return common.gteHardfork(FIRST_HARDFORK_WITH_TRANSACTION_TYPE);
}
exports.shouldShowTransactionTypeForHardfork = shouldShowTransactionTypeForHardfork;
function shouldShowEffectiveGasPriceForHardfork(common) {
    return common.gteHardfork(FIRST_HARDFORK_WITH_EIP1559);
}
exports.shouldShowEffectiveGasPriceForHardfork = shouldShowEffectiveGasPriceForHardfork;
//# sourceMappingURL=output.js.map