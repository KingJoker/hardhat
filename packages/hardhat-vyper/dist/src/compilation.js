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
exports.compile = void 0;
const hardhat_docker_1 = require("@nomiclabs/hardhat-docker");
const fs_extra_1 = __importDefault(require("fs-extra"));
const plugins_1 = require("hardhat/plugins");
const source_names_1 = require("hardhat/utils/source-names");
const path_1 = __importDefault(require("path"));
const VYPER_DOCKER_REPOSITORY = "vyperlang/vyper";
const LAST_VYPER_VERSION_USED_FILENAME = "last-vyper-version-used.txt";
const VYPER_DOCKER_IMAGES_LAST_UPDATE_CHECK_FILE = "vyper-docker-updates.json";
const CHECK_UPDATES_INTERVAL = 3600000;
const ARTIFACT_FORMAT_VERSION = "hh-vyper-artifact-1";
async function compile(vyperConfig, paths, artifacts) {
    const vyperVersion = vyperConfig.version;
    const dockerImage = {
        repository: VYPER_DOCKER_REPOSITORY,
        tag: vyperVersion,
    };
    await validateDockerIsInstalled();
    const docker = await handleCommonErrors(hardhat_docker_1.HardhatDocker.create());
    await handleCommonErrors(pullImageIfNecessary(docker, dockerImage, paths.cache));
    const files = await getVyperSources(paths);
    let someContractFailed = false;
    for (const file of files) {
        const pathFromCWD = path_1.default.relative(process.cwd(), file);
        const pathFromSources = path_1.default.relative(paths.sources, file);
        if (await isAlreadyCompiled(file, paths, vyperVersion, files)) {
            console.log(pathFromCWD, "is already compiled");
            continue;
        }
        console.log("Compiling", pathFromCWD);
        const processResult = await handleCommonErrors(compileWithDocker(file, docker, dockerImage, paths));
        if (processResult.statusCode === 0) {
            const vyperOutput = JSON.parse(processResult.stdout.toString("utf8"))[pathFromSources];
            const sourceName = await source_names_1.localPathToSourceName(paths.root, file);
            const artifact = getArtifactFromVyperOutput(sourceName, vyperOutput);
            await artifacts.saveArtifactAndDebugFile(artifact);
        }
        else {
            console.error(processResult.stderr.toString("utf8").trim(), "\n");
            someContractFailed = true;
        }
    }
    if (someContractFailed) {
        throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-vyper", "Compilation failed");
    }
    await saveLastVyperVersionUsed(vyperVersion, paths);
}
exports.compile = compile;
async function isAlreadyCompiled(sourceFile, paths, vyperVersion, sources) {
    const lastVyperVersionUsed = await getLastVyperVersionUsed(paths);
    if (lastVyperVersionUsed !== vyperVersion) {
        return false;
    }
    const contractName = pathToContractName(sourceFile);
    const artifactPath = path_1.default.join(paths.artifacts, `${contractName}.json`);
    if (!(await fs_extra_1.default.pathExists(artifactPath))) {
        return false;
    }
    const artifactCtime = (await fs_extra_1.default.stat(artifactPath)).ctimeMs;
    const stats = await Promise.all(sources.map((f) => fs_extra_1.default.stat(f)));
    const lastSourcesCtime = Math.max(...stats.map((s) => s.ctimeMs));
    return lastSourcesCtime < artifactCtime;
}
async function getVyperSources(paths) {
    const glob = await Promise.resolve().then(() => __importStar(require("glob")));
    const vyFiles = glob.sync(path_1.default.join(paths.sources, "**", "*.vy"));
    const vpyFiles = glob.sync(path_1.default.join(paths.sources, "**", "*.v.py"));
    return [...vyFiles, ...vpyFiles];
}
function pathToContractName(file) {
    const sourceName = path_1.default.basename(file);
    return sourceName.substring(0, sourceName.indexOf("."));
}
function getArtifactFromVyperOutput(sourceName, output) {
    const contractName = pathToContractName(sourceName);
    return {
        _format: ARTIFACT_FORMAT_VERSION,
        contractName,
        sourceName,
        abi: output.abi,
        bytecode: add0xPrefixIfNecessary(output.bytecode),
        deployedBytecode: add0xPrefixIfNecessary(output.bytecode_runtime),
        linkReferences: {},
        deployedLinkReferences: {},
    };
}
function add0xPrefixIfNecessary(hex) {
    hex = hex.toLowerCase();
    if (hex.slice(0, 2) === "0x") {
        return hex;
    }
    return `0x${hex}`;
}
async function getLastVyperVersionUsed(paths) {
    const filePath = path_1.default.join(paths.cache, LAST_VYPER_VERSION_USED_FILENAME);
    if (!(await fs_extra_1.default.pathExists(filePath))) {
        return undefined;
    }
    return fs_extra_1.default.readFile(filePath, "utf8");
}
async function saveLastVyperVersionUsed(version, paths) {
    const filePath = path_1.default.join(paths.cache, LAST_VYPER_VERSION_USED_FILENAME);
    await fs_extra_1.default.ensureDir(path_1.default.dirname(filePath));
    return fs_extra_1.default.writeFile(filePath, version, "utf8");
}
async function validateDockerIsInstalled() {
    if (!(await hardhat_docker_1.HardhatDocker.isInstalled())) {
        throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-vyper", `Docker Desktop is not installed.
Please install it by following the instructions on https://www.docker.com/get-started`);
    }
}
async function pullImageIfNecessary(docker, image, cachePath) {
    if (!(await docker.hasPulledImage(image))) {
        console.log(`Pulling Docker image ${hardhat_docker_1.HardhatDocker.imageToRepoTag(image)}...`);
        await docker.pullImage(image);
        console.log(`Image pulled`);
    }
    else {
        await checkForImageUpdates(docker, image, cachePath);
    }
}
async function checkForImageUpdates(docker, image, cachePath) {
    if (!(await shouldCheckForUpdates(image, cachePath))) {
        return;
    }
    if (!(await docker.isImageUpToDate(image))) {
        console.log(`Updating Docker image ${hardhat_docker_1.HardhatDocker.imageToRepoTag(image)}...`);
        await docker.pullImage(image);
        console.log(`Image updated`);
    }
    await saveLastUpdateCheckDate(image, cachePath);
}
async function shouldCheckForUpdates(image, cachePath) {
    const lastDate = await getLastUpdateCheckDate(image, cachePath);
    if (lastDate === undefined) {
        return true;
    }
    return lastDate + CHECK_UPDATES_INTERVAL < +new Date();
}
async function getLastUpdateCheckDate(image, cachePath) {
    const file = path_1.default.join(cachePath, VYPER_DOCKER_IMAGES_LAST_UPDATE_CHECK_FILE);
    if (!(await fs_extra_1.default.pathExists(file))) {
        return undefined;
    }
    const updates = await fs_extra_1.default.readJSON(file);
    return updates[hardhat_docker_1.HardhatDocker.imageToRepoTag(image)];
}
async function saveLastUpdateCheckDate(image, cachePath) {
    let updates;
    const file = path_1.default.join(cachePath, VYPER_DOCKER_IMAGES_LAST_UPDATE_CHECK_FILE);
    if (!(await fs_extra_1.default.pathExists(file))) {
        updates = {};
    }
    else {
        updates = await fs_extra_1.default.readJSON(file);
    }
    updates[hardhat_docker_1.HardhatDocker.imageToRepoTag(image)] = +new Date();
    await fs_extra_1.default.ensureDir(path_1.default.dirname(file));
    await fs_extra_1.default.writeJSON(file, updates, {
        spaces: 2,
    });
}
async function compileWithDocker(filePath, docker, dockerImage, paths) {
    const pathFromSources = path_1.default.relative(paths.sources, filePath);
    return docker.runContainer(dockerImage, ["vyper", "-f", "combined_json", pathFromSources], {
        binds: {
            [paths.sources]: "/code",
        },
        workingDirectory: "/code",
    });
}
async function handleCommonErrors(promise) {
    try {
        return await promise;
    }
    catch (error) {
        if (error instanceof hardhat_docker_1.DockerNotRunningError ||
            error instanceof hardhat_docker_1.DockerBadGatewayError) {
            throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-vyper", "Docker Desktop is not running.\nPlease open it and wait until it finishes booting.", error);
        }
        if (error instanceof hardhat_docker_1.DockerHubConnectionError) {
            throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-vyper", `Error connecting to Docker Hub.
Please check your internet connection.`, error);
        }
        if (error instanceof hardhat_docker_1.DockerServerError) {
            throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-vyper", "Docker error", error);
        }
        if (error instanceof hardhat_docker_1.ImageDoesntExistError) {
            throw new plugins_1.NomicLabsHardhatPluginError("@nomiclabs/hardhat-vyper", `Docker image ${hardhat_docker_1.HardhatDocker.imageToRepoTag(error.image)} doesn't exist.
Make sure you chose a valid Vyper version.`);
        }
        throw error;
    }
}
//# sourceMappingURL=compilation.js.map