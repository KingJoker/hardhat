"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const plugins_1 = require("hardhat/plugins");
const helpers_1 = require("./helpers");
describe("Vyper plugin", async function () {
    describe("Successful compilation", async function () {
        helpers_1.useEnvironment("successful-compilation");
        it("Should successfully compile the contract", async function () {
            await this.env.run(task_names_1.TASK_COMPILE);
            chai_1.assert.equal(this.env.artifacts.readArtifactSync("test").contractName, "test");
        });
    });
    describe("Partial compilation", async function () {
        helpers_1.useEnvironment("partial-compilation");
        it("Should successfully compile the contract", async function () {
            try {
                await this.env.run(task_names_1.TASK_COMPILE);
            }
            catch (error) {
                chai_1.assert.instanceOf(error, plugins_1.NomicLabsHardhatPluginError);
                chai_1.assert.include("compilation failed", error.message.toLowerCase());
                chai_1.assert.equal(this.env.artifacts.readArtifactSync("test").contractName, "test");
                return;
            }
            chai_1.assert.fail("Should have failed");
        });
    });
    describe("Mixed language", async function () {
        helpers_1.useEnvironment("mixed-language");
        it("Should successfully compile the contracts", async function () {
            await this.env.run(task_names_1.TASK_COMPILE);
            chai_1.assert.equal(this.env.artifacts.readArtifactSync("test").contractName, "test");
            chai_1.assert.equal(this.env.artifacts.readArtifactSync("Greeter").contractName, "Greeter");
        });
    });
});
//# sourceMappingURL=tests.js.map