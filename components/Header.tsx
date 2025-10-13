'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm"> {/* Changed: White background with subtle shadow */}
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black"> {/* Changed: Black text */}
            AVA Lite
          </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-accent transition-colors"> {/* Changed: Dark gray text, orange hover */}
                Home
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-accent transition-colors">
                Services
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-accent transition-colors">
                Team
              </Link>
              <Link href="/case-studies" className="text-gray-700 hover:text-accent transition-colors">
                Work
              </Link>
              <a 
                href="https://instagram.com/avalite2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary text-sm"
              >
                Contact
              </a>
            </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-black" {/* Changed: Light hover, black icon */}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200"> {/* Changed: Light border */}
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-accent transition-colors" /* Changed: Dark gray text, orange hover */
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/team" 
                className="text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                href="/case-studies" 
                className="text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </Link>
              <a 
                href="https://instagram.com/avalite2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}