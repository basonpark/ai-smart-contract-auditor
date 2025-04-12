"use client"; // This page uses client-side hooks (useState, useEffect)

import React, { useState } from "react";
import ContractSubmissionForm from "@/components/audit/ContractSubmissionForm";
import AuditResultsDisplay from "@/components/audit/AuditResultsDisplay";
import { submitAuditRequest } from "@/services/audit.service";

export default function Home() {
  // State for loading indicator during API call
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to store audit results received from backend
  const [auditResults, setAuditResults] = useState<any>(null);
  // State to store any errors during the process
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the form submission by calling the backend API.
   * @param code - The contract code submitted by the user.
   */
  const handleAuditSubmit = async (code: string) => {
    setIsLoading(true);
    setAuditResults(null); // Clear previous results
    setError(null); // Clear previous errors

    try {
      console.log("Sending code to backend...");
      const results = await submitAuditRequest(code);
      console.log("Received results from backend:", results);
      setAuditResults(results);
    } catch (err: any) {
      console.error("Audit submission failed:", err);
      setError(err.message || "An unknown error occurred during the audit.");
      setAuditResults(null); // Ensure results are cleared on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
        AI-Powered Smart Contract Auditor
      </h1>
      <p className="text-center text-gray-600 mb-8 md:mb-12 text-base md:text-lg">
        Submit your Solidity smart contract code for automated security
        analysis.
      </p>

      {/* Contract Submission Form Card */}
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
        <ContractSubmissionForm
          onSubmit={handleAuditSubmit}
          isLoading={isLoading}
        />
      </div>

      {/* Display Area for Audit Results or Loading/Error States */}
      <div className="max-w-4xl mx-auto mt-10 md:mt-12">
        <AuditResultsDisplay
          results={auditResults}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
