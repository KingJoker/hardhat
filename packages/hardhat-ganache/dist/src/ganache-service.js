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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GanacheService = void 0;
const debug_1 = __importDefault(require("debug"));
const errors_1 = require("hardhat/internal/core/errors");
const url_1 = require("url");
const log = debug_1.default("hardhat:plugin:ganache-service");
const DEFAULT_PORT = 7545;
class GanacheService {
    constructor(Ganache, options) {
        log("Initializing server");
        // Validate and Transform received options before initialize server
        this._options = this._validateAndTransformOptions(options);
        try {
            // Initialize server and provider with given options
            this._server = Ganache.server(this._options);
            // Register server and system error handlers
            this._registerSystemErrorsHandlers();
        }
        catch (e) {
            // Verify the expected error or throw it again
            if (e.name === "TypeError") {
                if (GanacheService.error === undefined) {
                    const error = new errors_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-ganache", `Ganache plugin config is invalid: ${e.message}`, e);
                    log("Failed to initialize GanacheService\n", error);
                    GanacheService.error = error;
                }
            }
            else {
                throw new errors_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-ganache", `Failed to initialize GanacheService: ${e.message}`, e);
            }
        }
    }
    static getDefaultOptions() {
        return {
            url: `http://127.0.0.1:${DEFAULT_PORT}`,
            gasPrice: 20000000000,
            gasLimit: 6721975,
            defaultBalanceEther: 100,
            totalAccounts: 10,
            hardfork: "muirGlacier",
            allowUnlimitedContractSize: false,
            locked: false,
            hdPath: "m/44'/60'/0'/0/",
            keepAliveTimeout: 5000,
        };
    }
    static async create(options) {
        // We use this weird way of importing this library here as a workaround
        // to this issue https://github.com/trufflesuite/ganache-core/issues/465
        const Ganache = (() => require)()("ganache-core");
        // Get and initialize option validator
        const { default: optionsSchema } = await Promise.resolve().then(() => __importStar(require("./ganache-options-ti")));
        const { createCheckers } = await Promise.resolve().then(() => __importStar(require("ts-interface-checker")));
        const { GanacheOptionsTi } = createCheckers(optionsSchema);
        GanacheService.optionValidator = GanacheOptionsTi;
        return new GanacheService(Ganache, options);
    }
    async startServer() {
        // Verify service state before start (TODO Maybe extract this to a decorator)
        this._checkForServiceErrors();
        try {
            log("Starting server");
            // Get port and hostname from validated options
            const port = this._options.port;
            const hostname = this._options.hostname;
            // Start server with current configs (port and hostname)
            await new Promise((resolve, reject) => {
                // eslint-disable-next-line prefer-const
                let onError;
                const onListening = () => {
                    this._server.removeListener("error", onError);
                    resolve();
                };
                onError = (err) => {
                    this._server.removeListener("listening", onListening);
                    reject(err);
                };
                this._server.once("listening", onListening);
                this._server.once("error", onError);
                this._server.listen(port, hostname);
            });
        }
        catch (e) {
            const error = new errors_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-ganache", `Failed to start GanacheService: ${e.message}`, e);
            if (GanacheService.error === undefined) {
                log("Failed to start GanacheService\n", error);
                GanacheService.error = error;
            }
        }
        // Verify service state after start (TODO Maybe extract this to a decorator)
        this._checkForServiceErrors();
    }
    async stopServer() {
        // Verify service state before continue (TODO Maybe extract this to a decorator)
        this._checkForServiceErrors();
        try {
            log("Stopping server");
            // Stop server and Wait for it
            await new Promise((resolve, reject) => {
                this._server.close((err) => {
                    if (err !== undefined && err !== null) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
        catch (e) {
            const error = new errors_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-ganache", `Failed to stop GanacheService: ${e.message}`, e);
            if (GanacheService.error === undefined) {
                log("Failed to stop GanacheService\n", error);
                GanacheService.error = error;
            }
        }
        this._checkForServiceErrors();
    }
    _validateAndTransformOptions(options) {
        const validatedOptions = options;
        // Validate and parse hostname and port from URL (this validation is priority)
        const url = new url_1.URL(options.url);
        if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
            throw new errors_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-ganache", "Ganache network only works with localhost");
        }
        // Validate all options agains validator
        try {
            GanacheService.optionValidator.check(options);
        }
        catch (e) {
            throw new errors_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-ganache", `Ganache network config is invalid: ${e.message}`, e);
        }
        // Test for unsupported commands
        if (options.accounts !== undefined) {
            throw new errors_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-ganache", "Config: ganache.accounts unsupported for this network");
        }
        // Transform needed options to Ganache core server (not using SnakeCase lib for performance)
        validatedOptions.hostname = url.hostname;
        validatedOptions.port =
            url.port !== undefined && url.port !== ""
                ? parseInt(url.port, 10)
                : DEFAULT_PORT;
        const optionsToInclude = [
            "accountsKeyPath",
            "dbPath",
            "defaultBalanceEther",
            "totalAccounts",
            "unlockedAccounts",
        ];
        for (const [key, value] of Object.entries(options)) {
            if (value !== undefined && optionsToInclude.includes(key)) {
                validatedOptions[this._snakeCase(key)] = value;
                delete validatedOptions[key];
            }
        }
        return validatedOptions;
    }
    _registerSystemErrorsHandlers() {
        const server = this._server;
        // Add listener for general server errors
        server.on("error", function (err) {
            if (GanacheService.error === undefined &&
                err !== undefined &&
                err !== null) {
                log("An error occurred in GanacheService\n", err);
                GanacheService.error = err;
            }
        });
    }
    _checkForServiceErrors() {
        if (GanacheService.error !== undefined) {
            if (this._server !== undefined) {
                this._server.close();
            }
            throw new errors_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-ganache", `An error occurred in GanacheService: ${GanacheService.error.message}`, GanacheService.error);
        }
    }
    _snakeCase(str) {
        return str.replace(/([A-Z]){1}/g, (match) => `_${match.toLowerCase()}`);
    }
}
exports.GanacheService = GanacheService;
//# sourceMappingURL=ganache-service.js.map