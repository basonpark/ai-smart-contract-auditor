"use client"; // This component uses client-side hooks (useState)

import React, { useState, FormEvent } from "react";

interface ContractSubmissionFormProps {
  onSubmit: (code: string) => void; // Callback function when form is submitted
  isLoading: boolean; // To disable form during processing
}

const ContractSubmissionForm: React.FC<ContractSubmissionFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [contractCode, setContractCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    if (!contractCode.trim()) {
      setError("Contract code cannot be empty.");
      return;
    }

    // Basic check for common Solidity structure (very rudimentary)
    if (
      !contractCode.includes("contract") &&
      !contractCode.includes("pragma solidity")
    ) {
      setError("Please provide valid Solidity code.");
      // return; // Commented out for initial flexibility
    }

    onSubmit(contractCode);
  };

  // TODO: Add file upload functionality
  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => { ... };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="contractCode"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Paste Solidity Code:
        </label>
        <textarea
          id="contractCode"
          name="contractCode"
          rows={15}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm text-gray-900 bg-gray-50 placeholder-gray-400"
          placeholder="pragma solidity ^0.8.0;\n\ncontract MyContract {\n    // ... your code here\n}"
          value={contractCode}
          onChange={(e) => setContractCode(e.target.value)}
          disabled={isLoading}
          spellCheck="false"
        />
        {/* TODO: Add syntax highlighting component here later */}
      </div>

      {/* Placeholder for file upload */}
      {/*
            <div>
                <label htmlFor="contractFile" className="block text-sm font-medium text-gray-700 mb-1">
                    Or Upload .sol File:
                </label>
                <input 
                    type="file"
                    id="contractFile"
                    name="contractFile"
                    accept=".sol"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    onChange={handleFileUpload} // Implement this handler
                    disabled={isLoading}
                />
            </div>
            */}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Auditing..." : "Analyze Contract"}
        </button>
      </div>
    </form>
  );
};

export default ContractSubmissionForm;
