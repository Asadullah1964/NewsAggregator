// app/ClientLayout.tsx
"use client";

import React, { ReactNode, useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <>
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        search={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main
        className="
          pt-16
          pl-0
          md:pl-48
          lg:pl-72
          min-h-screen
          bg-gray-50 dark:bg-gray-900
          transition-colors
        "
      >
        <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
        <Footer />
      </main>
    </>
  );
}
