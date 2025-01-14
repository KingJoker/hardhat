"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherscanConfigExtender = void 0;
exports.etherscanConfigExtender = (resolvedConfig, config) => {
    const defaultConfig = { apiKey: "" };
    if (config.etherscan !== undefined) {
        const customConfig = config.etherscan;
        resolvedConfig.etherscan = Object.assign(Object.assign({}, defaultConfig), customConfig);
    }
    else {
        resolvedConfig.etherscan = defaultConfig;
    }
};
//# sourceMappingURL=config.js.map