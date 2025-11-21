import Link from 'next/link'
import { getSettings } from '@/lib/supabase.queries'

export default async function Header() {
  const settings = await getSettings()

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
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
