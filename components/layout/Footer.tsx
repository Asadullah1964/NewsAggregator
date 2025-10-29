'use client';

import { FaTwitter, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

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
            <li><a href="/" className="hover:text-primary-500">Home</a></li>
            <li><a href="/categories" className="hover:text-primary-500">Categories</a></li>
            <li><a href="/bookmarks" className="hover:text-primary-500">Bookmarks</a></li>
            <li><a href="/about" className="hover:text-primary-500">About</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/news/business" className="hover:text-primary-500">Business</a></li>
            <li><a href="/news/technology" className="hover:text-primary-500">Technology</a></li>
            <li><a href="/news/sports" className="hover:text-primary-500">Sports</a></li>
            <li><a href="/news/entertainment" className="hover:text-primary-500">Entertainment</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-blue-500"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin /></a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-gray-100"><FaGithub /></a>
            <a href="#" className="hover:text-green-500"><FaGlobe /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t dark:border-gray-700 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold text-primary-600 dark:text-primary-400">NewsNest</span>. All rights reserved.
      </div>
    </footer>
  );
}
