"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const helpers_1 = require("../helpers");
describe("hardhat-etherscan configuration extension", function () {
    helpers_1.useEnvironment("hardhat-project-defined-config", "hardhat");
    it("the etherscan field should be present", function () {
        chai_1.assert.isDefined(this.env.config.etherscan);
    });
    it("the etherscan token should have value from hardhat.env.config.js", function () {
        const { etherscan } = this.env.config;
        chai_1.assert.equal(etherscan.apiKey, "testtoken");
    });
});
describe("hardhat-etherscan configuration defaults in an empty project", function () {
    helpers_1.useEnvironment("hardhat-project-undefined-config", "hardhat");
    it("the etherscan field should be present", function () {
        chai_1.assert.isDefined(this.env.config.etherscan);
    });
});
//# sourceMappingURL=HardhatRuntimeEnvironmentExtensionTests.js.map