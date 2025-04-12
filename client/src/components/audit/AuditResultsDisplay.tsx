import React from "react";

interface AuditResult {
  // Define the structure based on expected Slither (or other tool) output
  // This is a simplified placeholder based on the service example
  check: string;
  impact: string;
  confidence: string;
  description: string;
  // Add elements/source mapping details if needed for highlighting
}

interface AuditResultsDisplayProps {
  results: {
    success?: boolean;
    results?: { detectors?: AuditResult[] };
    message?: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const AuditResultsDisplay: React.FC<AuditResultsDisplayProps> = ({
  results,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="mt-8 p-6 border rounded-lg shadow-md bg-gray-50 text-center">
        <p className="text-lg font-medium text-gray-700">
          Auditing in progress...
        </p>
        {/* Add a spinner or loading animation here */}
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mt-4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 border border-red-200 rounded-lg shadow-md bg-red-50 text-red-700">
        <h3 className="text-lg font-semibold mb-2">Audit Failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!results) {
    return null; // Don't display anything if there are no results yet (initial state)
  }

  if (
    !results.success ||
    !results.results?.detectors ||
    results.results.detectors.length === 0
  ) {
    return (
      <div className="mt-8 p-6 border border-green-200 rounded-lg shadow-md bg-green-50 text-green-700">
        <h3 className="text-lg font-semibold mb-2">Audit Complete</h3>
        <p>{results.message || "No potential issues found."}</p>
      </div>
    );
  }

  const findings = results.results.detectors;

  // Simple severity sorting (can be more sophisticated)
  const sortedFindings = [...findings].sort((a, b) => {
    // Define the type for severity keys explicitly
    type Severity = "High" | "Medium" | "Low" | "Informational";
    const severityOrder: Record<Severity, number> = {
      High: 1,
      Medium: 2,
      Low: 3,
      Informational: 4,
    }; // Lower number = higher priority

    // Cast impact strings to Severity type for safe indexing
    const severityA = severityOrder[a.impact as Severity] || 99;
    const severityB = severityOrder[b.impact as Severity] || 99;
    return severityA - severityB;
  });

  return (
    <div className="mt-8 p-6 md:p-8 border rounded-lg shadow-lg bg-white divide-y divide-gray-200">
      <h3 className="text-xl md:text-2xl font-semibold mb-4 pb-4 text-gray-800 border-b border-gray-200">
        Audit Report
      </h3>
      {/* TODO: Add Summary Section (Counts by Severity) */}

      {sortedFindings.map((finding, index) => (
        <div key={index} className="py-5">
          <h4
            className={`text-lg font-medium mb-1.5 
                        ${
                          finding.impact === "High"
                            ? "text-red-600"
                            : finding.impact === "Medium"
                            ? "text-yellow-600"
                            : finding.impact === "Low"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
          >
            {finding.check} ({finding.impact} Impact)
          </h4>
          <p className="text-sm text-gray-700 mb-2">{finding.description}</p>
          {/* TODO: Add code snippet highlighting based on finding.elements */}
          {/* <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                        <code>Code snippet here...</code>
                    </pre> */}
        </div>
      ))}
    </div>
  );
};

export default AuditResultsDisplay;
