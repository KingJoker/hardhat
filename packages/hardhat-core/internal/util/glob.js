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
exports.globSync = exports.glob = void 0;
const path = __importStar(require("path"));
const util_1 = __importDefault(require("util"));
async function glob(pattern, options = {}) {
    const { default: globModule } = await Promise.resolve().then(() => __importStar(require("glob")));
    const files = await util_1.default.promisify(globModule)(pattern, options);
    return files.map(path.normalize);
}
exports.glob = glob;
function globSync(pattern, options = {}) {
    const files = require("glob").sync(pattern, options);
    return files.map(path.normalize);
}
exports.globSync = globSync;
//# sourceMappingURL=glob.js.map