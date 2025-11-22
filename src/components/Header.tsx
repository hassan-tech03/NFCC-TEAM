"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase.client";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    // Always set default first for immediate display
    setSettings({
      team_name: "New Friends Cricket Club",
      team_logo_url:
        "https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg",
    });

    if (!supabase) return;

    // Then try to load from database
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();
    if (data && !error) {
      setSettings(data);
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white flex-shrink-0">
              <Image
                src="https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg"
                alt="New Friends Cricket Club"
                width={48}
                height={48}
                className="object-cover"
                priority
              />
            </div>
            <span className="text-sm sm:text-lg md:text-2xl font-bold text-primary-700 line-clamp-1">
              {settings?.team_name || "New Friends Cricket Club"}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                pathname === "/"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/players"
              className={`font-medium transition-colors ${
                pathname === "/players"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Players
            </Link>
            <Link
              href="/matches"
              className={`font-medium transition-colors ${
                pathname === "/matches"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Matches
            </Link>
            <Link
              href="/previous-matches"
              className={`font-medium transition-colors ${
                pathname === "/previous-matches"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Results
            </Link>
            <Link
              href="/season-stats"
              className={`font-medium transition-colors ${
                pathname === "/season-stats"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Stats
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-colors ${
                pathname === "/about"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium transition-colors px-4 py-2 rounded-lg ${
                  pathname === "/"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                Home
              </Link>
              <Link
                href="/players"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium transition-colors px-4 py-2 rounded-lg ${
                  pathname === "/players"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                Players
              </Link>
              <Link
                href="/matches"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium transition-colors px-4 py-2 rounded-lg ${
                  pathname === "/matches"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                Matches
              </Link>
              <Link
                href="/previous-matches"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium transition-colors px-4 py-2 rounded-lg ${
                  pathname === "/previous-matches"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                Results
              </Link>
              <Link
                href="/season-stats"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium transition-colors px-4 py-2 rounded-lg ${
                  pathname === "/season-stats"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                Stats
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium transition-colors px-4 py-2 rounded-lg ${
                  pathname === "/about"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium transition-colors px-4 py-2 rounded-lg ${
                  pathname === "/contact"
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
