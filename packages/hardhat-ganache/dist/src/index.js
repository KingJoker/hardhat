"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const config_1 = require("hardhat/config");
const log = debug_1.default("hardhat:plugin:ganache");
const ganache_service_1 = require("./ganache-service");
config_1.task(task_names_1.TASK_TEST, async (_args, env, runSuper) => {
    return handlePluginTask(env, runSuper);
});
config_1.task(task_names_1.TASK_RUN, async (_args, env, runSuper) => {
    return handlePluginTask(env, runSuper);
});
config_1.extendConfig((resolvedConfig, config) => {
    const defaultOptions = ganache_service_1.GanacheService.getDefaultOptions();
    if (config.networks && config.networks.ganache) {
        const customOptions = config.networks.ganache;
        resolvedConfig.networks.ganache = Object.assign(Object.assign({}, defaultOptions), customOptions);
    }
    else {
        resolvedConfig.networks.ganache = defaultOptions;
    }
});
async function handlePluginTask(env, runSuper) {
    if (env.network.name !== "ganache") {
        return runSuper();
    }
    log("Starting Ganache");
    const options = env.network.config;
    const ganacheService = await ganache_service_1.GanacheService.create(options);
    await ganacheService.startServer();
    const ret = await runSuper();
    log("Stopping Ganache");
    await ganacheService.stopServer();
    return ret;
}
//# sourceMappingURL=index.js.map