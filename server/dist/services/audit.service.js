"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const os_1 = __importDefault(require("os"));
// Promisify execFile for async/await usage
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
/**
 * AuditService
 *
 * This service is responsible for handling the core logic of the smart contract audit.
 * It now integrates with the Slither static analysis tool.
 */
class AuditService {
    /**
     * Analyzes the provided Solidity contract code using Slither.
     *
     * @param code - The Solidity code as a string.
     * @param compilerVersion - Optional Solidity compiler version (e.g., "0.8.20").
     * @returns A promise that resolves with the audit results from Slither.
     * @throws Will throw an error if Slither execution fails or file operations fail.
     */
    static analyzeContract(code, compilerVersion) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("AuditService: analyzeContract called.");
            if (compilerVersion) {
                console.log(`Using specified compiler version: ${compilerVersion}`);
            }
            const tempDir = os_1.default.tmpdir();
            const uniqueId = (0, uuid_1.v4)();
            const inputFile = path_1.default.join(tempDir, `contract-${uniqueId}.sol`);
            const outputFile = path_1.default.join(tempDir, `results-${uniqueId}.json`);
            const slitherCommand = process.env.SLITHER_PATH || 'slither';
            console.log(`Input file: ${inputFile}`);
            console.log(`Output file: ${outputFile}`);
            console.log(`Using Slither command: ${slitherCommand}`);
            try {
                // 1. Write code to temp file
                console.log("Writing contract code...");
                yield promises_1.default.writeFile(inputFile, code, 'utf8');
                console.log("Temporary input file created.");
                // 2. Prepare Slither arguments
                const slitherArgs = [inputFile, '--json', outputFile];
                if (compilerVersion) {
                    // Add flag to specify compiler version
                    slitherArgs.push('--solc-solcs-select', compilerVersion);
                }
                // 3. Execute Slither
                const timeoutMs = 60000;
                console.log(`Executing Slither with args: ${slitherArgs.join(' ')} (timeout: ${timeoutMs / 1000}s)...`);
                try {
                    const { stdout, stderr } = yield execFileAsync(slitherCommand, slitherArgs, { timeout: timeoutMs });
                    console.log("Slither stdout:", stdout);
                    if (stderr) {
                        console.warn("Slither stderr:", stderr);
                    }
                    console.log("Slither execution completed.");
                }
                catch (error) {
                    console.error("Slither execution failed:", error);
                    const errorMessage = error.stderr ? `Slither error: ${error.stderr}` : error.message;
                    throw new Error(`Slither execution failed: ${errorMessage}`);
                }
                // 4. Read results
                console.log("Reading Slither results JSON...");
                const resultsJson = yield promises_1.default.readFile(outputFile, 'utf8');
                const results = JSON.parse(resultsJson);
                // 5. Check success flag
                if (!results.success) {
                    console.error("Slither analysis reported failure:", results.error);
                    throw new Error(`Slither analysis failed: ${results.error || 'Unknown Slither error'}`);
                }
                console.log("AuditService: Slither analysis successful.");
                return results;
            }
            catch (error) {
                console.error("Error during audit process:", error);
                throw new Error('Failed to perform smart contract audit.');
            }
            finally {
                console.log("Cleaning up temporary files...");
                try {
                    yield promises_1.default.unlink(inputFile);
                    console.log(`Deleted input file: ${inputFile}`);
                }
                catch (cleanupError) {
                    if (cleanupError.code !== 'ENOENT') {
                        console.error(`Error deleting temporary input file ${inputFile}:`, cleanupError);
                    }
                }
                try {
                    yield promises_1.default.unlink(outputFile);
                    console.log(`Deleted output file: ${outputFile}`);
                }
                catch (cleanupError) {
                    if (cleanupError.code !== 'ENOENT') {
                        console.error(`Error deleting temporary output file ${outputFile}:`, cleanupError);
                    }
                }
                console.log("Temporary file cleanup finished.");
            }
        });
    }
}
exports.AuditService = AuditService;
