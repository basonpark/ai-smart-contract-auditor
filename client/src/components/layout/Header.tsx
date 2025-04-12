import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold hover:text-gray-300">
          AI Smart Contract Auditor
        </Link>
        <div className="space-x-4">
          <Link
            href="/"
            className="px-3 py-2 rounded hover:bg-gray-700 text-sm font-medium transition-all duration-150 ease-in-out hover:scale-105"
          >
            Audit
          </Link>
          <span
            className="px-3 py-2 rounded text-sm font-medium text-gray-500 cursor-not-allowed transition-all duration-150 ease-in-out"
            title="Coming Soon!"
          >
            History
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
