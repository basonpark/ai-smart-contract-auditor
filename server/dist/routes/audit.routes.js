"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const audit_controller_1 = require("../controllers/audit.controller");
const router = (0, express_1.Router)();
// Route to handle contract submission
// POST /api/audit
router.post('/', audit_controller_1.submitContractForAudit);
exports.default = router;
