'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase.client'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    if (!supabase) {
      setSettings({
        team_name: 'New Friends Cricket Club',
        team_logo_url: 'https://res.cloudinary.com/dfy225ucr/image/upload/v1763752913/NFCC_qrgele.jpg'
      })
      return
    }

    const { data } = await supabase.from('settings').select('*').single()
    if (data) setSettings(data)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            {settings?.team_logo_url ? (
              <img 
                src={settings.team_logo_url} 
                alt="New Friends Cricket Club" 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-xl">
                🏏
              </div>
            )}
            <span className="text-2xl font-bold text-primary-700">
              {settings?.team_name || 'New Friends Cricket Club'}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/players" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Players
            </Link>
            <Link href="/matches" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Matches
            </Link>
            <Link href="/previous-matches" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Results
            </Link>
            <Link href="/season-stats" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Stats
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-colors px-4 py-2 rounded-lg"
              >
                Home
              </Link>
              <Link 
                href="/players" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-colors px-4 py-2 rounded-lg"
              >
                Players
              </Link>
              <Link 
                href="/matches" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-colors px-4 py-2 rounded-lg"
              >
                Matches
              </Link>
              <Link 
                href="/previous-matches" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-colors px-4 py-2 rounded-lg"
              >
                Results
              </Link>
              <Link 
                href="/season-stats" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-colors px-4 py-2 rounded-lg"
              >
                Stats
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-colors px-4 py-2 rounded-lg"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-primary-600 hover:bg-gray-50 font-medium transition-colors px-4 py-2 rounded-lg"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
