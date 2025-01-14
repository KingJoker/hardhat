"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nomiclabs/hardhat-web3");
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const config_1 = require("hardhat/config");
const util_1 = require("hardhat/internal/core/providers/util");
const glob_1 = require("hardhat/internal/util/glob");
const plugins_1 = require("hardhat/plugins");
const path_1 = require("path");
const artifacts_1 = require("./artifacts");
const fixture_1 = require("./fixture");
const provisioner_1 = require("./provisioner");
const task_names_2 = require("./task-names");
require("./type-extensions");
let accounts;
config_1.extendEnvironment((env) => {
    env.artifacts.require = plugins_1.lazyFunction(() => {
        const networkConfig = env.network.config;
        const provisioner = new provisioner_1.LazyTruffleContractProvisioner(env.web3, networkConfig);
        const ta = new artifacts_1.TruffleEnvironmentArtifacts(provisioner, env.artifacts);
        const execute = require("@nomiclabs/truffle-contract/lib/execute");
        let noDefaultAccounts = false;
        let defaultAccount = networkConfig.from;
        async function addFromIfNeededAndAvailable(params) {
            if (noDefaultAccounts) {
                return;
            }
            if (params.from === undefined) {
                if (defaultAccount === undefined) {
                    accounts = await env.web3.eth.getAccounts();
                    if (accounts.length === 0) {
                        noDefaultAccounts = true;
                        return;
                    }
                    defaultAccount = accounts[0];
                }
                params.from = defaultAccount;
            }
        }
        const web3Path = require.resolve("web3");
        const formattersPath = require.resolve("web3-core-helpers/src/formatters", {
            paths: [web3Path],
        });
        const formatters = require(formattersPath);
        monkeyPatchMethod(formatters, "inputTransactionFormatter", (og) => function (options) {
            if (options.from === undefined) {
                throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-truffle5", "There's no account available in the selected network.");
            }
            return og.call(formatters, options);
        });
        monkeyPatchMethod(execute, "getGasEstimate", (og) => async function (params, ...others) {
            await addFromIfNeededAndAvailable(params);
            return og.call(execute, params, ...others);
        });
        monkeyPatchMethod(execute, "prepareCall", (og) => async function (...args) {
            const ret = await og.apply(execute, args);
            await addFromIfNeededAndAvailable(ret.params);
            return ret;
        });
        return ta.require.bind(ta);
    });
    env.assert = plugins_1.lazyFunction(() => require("chai").assert);
    env.expect = plugins_1.lazyFunction(() => require("chai").expect);
    const describeContract = (description, definition, modifier) => {
        if (env.network.name === plugins_1.HARDHAT_NETWORK_NAME) {
            if (accounts === undefined) {
                const { privateToAddress, toChecksumAddress, bufferToHex, toBuffer, } = require("ethereumjs-util");
                const netConfig = env.network.config;
                accounts = util_1.normalizeHardhatNetworkAccountsConfig(netConfig.accounts).map((acc) => {
                    const buffer = toBuffer(acc.privateKey);
                    return toChecksumAddress(bufferToHex(privateToAddress(buffer)));
                });
            }
        }
        else if (accounts === undefined) {
            throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-truffle5", `To run your tests that use Truffle's "contract()" function with the network "${env.network.name}", you need to use Hardhat's CLI`);
        }
        const describeMod = modifier === undefined ? describe : describe[modifier];
        describeMod(`Contract: ${description}`, () => {
            before("Running truffle fixture if available", async function () {
                await env.run(task_names_2.RUN_TRUFFLE_FIXTURE_TASK);
            });
            definition(accounts);
        });
    };
    env.contract = Object.assign((desc, def) => describeContract(desc, def), {
        only: (desc, def) => describeContract(desc, def, "only"),
        skip: (desc, def) => describeContract(desc, def, "skip"),
    });
});
config_1.subtask(task_names_1.TASK_TEST_SETUP_TEST_ENVIRONMENT, async (_, { web3, network }) => {
    if (network.name !== plugins_1.HARDHAT_NETWORK_NAME) {
        accounts = await web3.eth.getAccounts();
    }
});
config_1.subtask(task_names_1.TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS, async (_, { config }, runSuper) => {
    const sources = await runSuper();
    const testSources = await glob_1.glob(path_1.join(config.paths.tests, "**", "*.sol"));
    return [...sources, ...testSources];
});
let wasWarningShown = false;
config_1.subtask(task_names_2.RUN_TRUFFLE_FIXTURE_TASK, async (_, env) => {
    const paths = env.config.paths;
    const hasFixture = await fixture_1.hasTruffleFixture(paths);
    if (!wasWarningShown) {
        if ((await fixture_1.hasMigrations(paths)) && !hasFixture) {
            console.warn("Your project has Truffle migrations, which have to be turned into a fixture to run your tests with Hardhat");
            wasWarningShown = true;
        }
    }
    if (hasFixture) {
        const fixture = await fixture_1.getTruffleFixtureFunction(paths);
        await fixture(env);
    }
});
function monkeyPatchMethod(object, property, newImplementationCreator) {
    const originalImplementationProperty = Symbol.for(`__${property}`);
    let originalImplementation;
    if (object[originalImplementationProperty] !== undefined) {
        originalImplementation = object[originalImplementationProperty];
    }
    else {
        Object.defineProperty(object, originalImplementationProperty, {
            configurable: true,
            writable: true,
            enumerable: false,
            value: object[property],
        });
        originalImplementation = object[property];
    }
    object[property] = newImplementationCreator(originalImplementation);
}
//# sourceMappingURL=index.js.map