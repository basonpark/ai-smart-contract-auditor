import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../services/audit.service';

/**
 * Handles the submission of smart contract code for auditing.
 * Expects the contract code and optionally compilerVersion in the request body.
 */
export const submitContractForAudit = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract code and optional compilerVersion
        const { code, compilerVersion } = req.body;

        if (!code || typeof code !== 'string') {
            res.status(400).json({ message: "Invalid request: 'code' field is missing or not a string." });
            return;
        }
         // Basic validation for version format (optional, can be done in service too)
         if (compilerVersion && typeof compilerVersion !== 'string') {
            res.status(400).json({ message: "Invalid request: 'compilerVersion' field must be a string." });
            return;
         }
          if (compilerVersion && !/^\d+\.\d+\.\d+$/.test(compilerVersion)) {
             res.status(400).json({ message: "Invalid compiler version format (e.g., 0.8.20)." });
             return;
         }

        console.log("Received contract code for audit...");
        if (compilerVersion) {
            console.log(`Compiler version specified: ${compilerVersion}`);
        }

        // Pass version to the service
        const results = await AuditService.analyzeContract(code, compilerVersion);

        res.status(200).json({ 
            message: 'Audit request processed', 
            results
        });

    } catch (error) {
        console.error("Error in submitContractForAudit:", error);
        next(error); 
    }
}; 