"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineFire,
  HiOutlineBookmark,
  HiX,
} from "react-icons/hi";

const categories = [
  { name: "Technology", slug: "technology", color: "#2563eb" },
  { name: "Business", slug: "business", color: "#16a34a" },
  { name: "Sports", slug: "sports", color: "#f59e42" },
  { name: "Entertainment", slug: "entertainment", color: "#e11d48" },
  { name: "Science", slug: "science", color: "#6366f1" },
];

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    // For category links, you may want to check startsWith
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:h-[calc(100vh-4rem)] md:top-16 md:w-48 lg:w-72 overflow-y-auto`} aria-label="Sidebar"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <HiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        <nav className="flex flex-col gap-3 px-6 py-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded px-2 py-1 transition focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              isActive("/") 
                ? "bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-white font-semibold" 
                : "text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
            }`}
          >
            <HiOutlineHome className="h-5 w-5" aria-hidden="true" />
            Home
          </Link>
          <Link
            href="/trending"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded px-2 py-1 transition focus:outline-none focus:ring-2 focus:ring-orange-400 ${
              isActive("/trending") 
                ? "bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-white font-semibold" 
                : "text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400"
            }`}
          >
            <HiOutlineFire className="h-5 w-5 text-orange-500" aria-hidden="true" />
            Trending
          </Link>
          <Link
            href="/bookmarks"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded px-2 py-1 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              isActive("/bookmarks") 
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-white font-semibold" 
                : "text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400"
            }`}
          >
            <HiOutlineBookmark className="h-5 w-5 text-yellow-500" aria-hidden="true" />
            Bookmarks
          </Link>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <h2 className="uppercase text-xs font-semibold text-gray-400 tracking-wide mb-3">
            Categories
          </h2>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 px-2 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                isActive(`/category/${cat.slug}`)
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-white font-semibold"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
              {cat.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
