import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';

// Promisify execFile for async/await usage
const execFileAsync = promisify(execFile);

/**
 * AuditService
 * 
 * This service is responsible for handling the core logic of the smart contract audit.
 * It now integrates with the Slither static analysis tool.
 */
export class AuditService {

    /**
     * Analyzes the provided Solidity contract code using Slither.
     * 
     * @param code - The Solidity code as a string.
     * @param compilerVersion - Optional Solidity compiler version (e.g., "0.8.20").
     * @returns A promise that resolves with the audit results from Slither.
     * @throws Will throw an error if Slither execution fails or file operations fail.
     */
    public static async analyzeContract(code: string, compilerVersion?: string): Promise<any> {
        console.log("AuditService: analyzeContract called.");
        if (compilerVersion) {
            console.log(`Using specified compiler version: ${compilerVersion}`);
        }

        const tempDir = os.tmpdir();
        const uniqueId = uuidv4();
        const inputFile = path.join(tempDir, `contract-${uniqueId}.sol`);
        const outputFile = path.join(tempDir, `results-${uniqueId}.json`);
        const slitherCommand = process.env.SLITHER_PATH || 'slither';

        console.log(`Input file: ${inputFile}`);
        console.log(`Output file: ${outputFile}`);
        console.log(`Using Slither command: ${slitherCommand}`);

        try {
            // 1. Write code to temp file
            console.log("Writing contract code...");
            await fs.writeFile(inputFile, code, 'utf8');
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
                 const { stdout, stderr } = await execFileAsync(slitherCommand, slitherArgs, { timeout: timeoutMs });
                 console.log("Slither stdout:", stdout);
                 if (stderr) {
                    console.warn("Slither stderr:", stderr); 
                 }
                 console.log("Slither execution completed.");

            } catch (error: any) {
                console.error("Slither execution failed:", error);
                const errorMessage = error.stderr ? `Slither error: ${error.stderr}` : error.message;
                throw new Error(`Slither execution failed: ${errorMessage}`);
            }

            // 4. Read results
            console.log("Reading Slither results JSON...");
            const resultsJson = await fs.readFile(outputFile, 'utf8');
            const results = JSON.parse(resultsJson);

            // 5. Check success flag
            if (!results.success) {
                console.error("Slither analysis reported failure:", results.error);
                throw new Error(`Slither analysis failed: ${results.error || 'Unknown Slither error'}`);
            }

            console.log("AuditService: Slither analysis successful.");
            return results; 

        } catch (error) {
            console.error("Error during audit process:", error);
            throw new Error('Failed to perform smart contract audit.'); 
        
        } finally {
            console.log("Cleaning up temporary files...");
            try {
                await fs.unlink(inputFile);
                console.log(`Deleted input file: ${inputFile}`);
            } catch (cleanupError: any) {
                if (cleanupError.code !== 'ENOENT') {
                     console.error(`Error deleting temporary input file ${inputFile}:`, cleanupError);
                }
            }
            try {
                await fs.unlink(outputFile);
                 console.log(`Deleted output file: ${outputFile}`);
            } catch (cleanupError: any) {
                 if (cleanupError.code !== 'ENOENT') { 
                    console.error(`Error deleting temporary output file ${outputFile}:`, cleanupError);
                 }
            }
            console.log("Temporary file cleanup finished.");
        }
    }
} 