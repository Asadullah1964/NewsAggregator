'use client';

import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-10 border-t dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            NewsNest
          </h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Stay updated with the latest headlines, breaking news, and top
            stories from around the world — all in one place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-primary-500">Home</Link></li>
            <li><Link href="/categories" className="hover:text-primary-500">Categories</Link></li>
            <li><Link href="/bookmarks" className="hover:text-primary-500">Bookmarks</Link></li>
            <li><Link href="/about" className="hover:text-primary-500">About</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/news/business" className="hover:text-primary-500">Business</Link></li>
            <li><Link href="/news/technology" className="hover:text-primary-500">Technology</Link></li>
            <li><Link href="/news/sports" className="hover:text-primary-500">Sports</Link></li>
            <li><Link href="/news/entertainment" className="hover:text-primary-500">Entertainment</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <div className="flex space-x-4 text-2xl">
            <Link href="#" className="hover:text-blue-500"><FaTwitter /></Link>
            <Link href="#" className="hover:text-blue-700"><FaLinkedin /></Link>
            <Link href="#" className="hover:text-gray-800 dark:hover:text-gray-100"><FaGithub /></Link>
            <Link href="#" className="hover:text-green-500"><FaGlobe /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t dark:border-gray-700 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-primary-600 dark:text-primary-400">NewsNest</span>. All rights reserved.
      </div>
    </footer>
  );
}
