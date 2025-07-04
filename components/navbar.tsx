"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, User, Menu, X } from "lucide-react";
import SearchModal from "./search-modal";
import Image from "next/image";

interface NavbarProps {
  currentPage?: string;
  isHomePage?: boolean;
}

export default function Navbar({
  currentPage = "home",
  isHomePage = false,
}: NavbarProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", key: "home" },
    { name: "Vehicles", href: "/vehicles", key: "vehicles" },
    { name: "Services", href: "/services", key: "services" },

    { name: "Articles", href: "/articles", key: "articles" },
    { name: "Contact", href: "/contact", key: "contact" },
  ];

  const handleProfileClick = () => {
    router.push("/admin/login");
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleNavClick = (href: string, key: string, e: React.MouseEvent) => {
    // Prevent default behavior if clicking the same page
    if (currentPage === key) {
      e.preventDefault();
      return;
    }
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  };

  // Use different styling for home page vs other pages
  const navbarClasses = isHomePage
    ? "py-4" // Home page navbar (no sticky/backdrop styling since it's handled by parent)
    : "sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200 py-4";

  return (
    <>
      <nav className={navbarClasses}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/logo.png"
                alt="Forbes Capital Cars Logo"
                width={250} // adjust size as needed
                height={40}
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, item.key, e)}
                  className={`text-sm transition-all duration-300 pb-1 font-light ${
                    currentPage === item.key
                      ? "text-blue-600 border-b-2 border-blue-600 cursor-default"
                      : "text-gray-700 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="ml-5 flex items-center space-x-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSearchClick}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleProfileClick}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <User className="h-4 w-4" />
              </Button>

              {/* Mobile Menu Button */}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col justify-center items-center transition-all duration-300">
          <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col w-full max-w-xs mx-auto space-y-4 pt-12">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, item.key, e)}
                className={`font-medium py-4 px-6 rounded-lg text-center text-lg transition-all duration-300 w-full block ${
                  currentPage === item.key
                    ? "text-blue-600 bg-blue-50 cursor-default"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
