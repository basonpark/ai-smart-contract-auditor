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
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitContractForAudit = void 0;
const audit_service_1 = require("../services/audit.service");
/**
 * Handles the submission of smart contract code for auditing.
 * Expects the contract code and optionally compilerVersion in the request body.
 */
const submitContractForAudit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const results = yield audit_service_1.AuditService.analyzeContract(code, compilerVersion);
        res.status(200).json({
            message: 'Audit request processed',
            results
        });
    }
    catch (error) {
        console.error("Error in submitContractForAudit:", error);
        next(error);
    }
});
exports.submitContractForAudit = submitContractForAudit;
