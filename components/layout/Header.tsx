"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  HiOutlineSearch,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineUser,
  HiMenu,
} from "react-icons/hi";

type HeaderProps = {
  onToggleSidebar: () => void;
  search: string;
  onSearchChange: (value: string) => void;
};

export default function Header({ onToggleSidebar, search, onSearchChange }: HeaderProps) {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const isActive = (path: string) => pathname === path;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearchChange(e.target.value); // Optional: keep parent state updated on every input change
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (inputValue.trim()) {
      params.set("search", inputValue.trim());
      params.set("page", "1"); // reset to first page on new search
    } else {
      params.delete("search");
      params.delete("page");
    }

    const url = `/?${params.toString()}`;
    router.push(url);
  };

  return (
    <header
      className="
        fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 
        z-30 flex items-center px-4 sm:px-6 lg:px-8
      "
    >
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 mr-3"
      >
        <HiMenu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
      </button>

      <Link
        href="/"
        className={`flex items-center text-2xl font-extrabold tracking-tight ${
          isActive("/")
            ? "text-primary-700 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
        }`}
        aria-label="News Aggregator Home"
      >
        <span className="text-3xl mr-2" aria-hidden="true">
          📰
        </span>
        News
      </Link>

      <nav className="hidden md:flex space-x-8 ml-10 text-base font-medium">
        <Link
          href="/"
          className={`rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isActive("/")
              ? "text-primary-700 dark:text-primary-400"
              : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
          }`}
        >
          Home
        </Link>
        <Link
          href="/trending"
          className={`rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isActive("/trending")
              ? "text-orange-600 dark:text-orange-400"
              : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
          }`}
        >
          Trending
        </Link>
        <Link
          href="/bookmarks"
          className={`rounded focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isActive("/bookmarks")
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400"
          }`}
        >
          Bookmarks
        </Link>
      </nav>

      <div className="flex-1" />

      <form
        onSubmit={handleSearchSubmit}
        className="hidden md:block relative w-72 mr-4"
        role="search"
      >
        <label htmlFor="header-search" className="sr-only">
          Search news
        </label>
        <input
          id="header-search"
          type="search"
          placeholder="Search news..."
          value={inputValue}
          onChange={handleInputChange}
          className="
            w-full rounded-full border border-gray-300 bg-gray-100 px-10 py-2 text-sm text-gray-900 placeholder-gray-500 shadow-sm 
            focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500
            dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400
          "
          aria-label="Search news"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-600 hover:text-primary-700"
        >
          <HiOutlineSearch className="h-5 w-5" />
        </button>
      </form>

      {mounted && (
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle light/dark mode"
          className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        >
          {currentTheme === "dark" ? (
            <HiOutlineSun className="h-5 w-5 text-yellow-400" />
          ) : (
            <HiOutlineMoon className="h-5 w-5 text-gray-700" />
          )}
        </button>
      )}

    </header>
  );
}
