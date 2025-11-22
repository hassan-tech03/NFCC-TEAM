import Link from 'next/link'
import {
  getSettings,
  getStats,
  getFeaturedPlayers,
  getNextMatch,
  getRecentMatches,
  getFeaturedNews,
} from '@/lib/supabase.queries'

async function getHomeData() {
  const [settings, stats, featuredPlayers, nextMatch, recentMatches, featuredNews] = await Promise.all([
    getSettings(),
    getStats(),
    getFeaturedPlayers(),
    getNextMatch(),
    getRecentMatches(),
    getFeaturedNews(),
  ])

  return { settings, stats, featuredPlayers, nextMatch, recentMatches, featuredNews }
}

export default async function HomePage() {
  const { settings, stats, featuredPlayers, nextMatch, recentMatches, featuredNews } = await getHomeData()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] bg-gradient-to-r from-primary-900 to-primary-700">
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
              {settings?.team_name || 'Welcome to Our Team'}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl">
              {settings?.tagline || 'Excellence in Cricket'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/matches" className="btn-primary text-center">
                Upcoming Matches
              </Link>
              <Link href="/players" className="btn-secondary bg-white hover:bg-gray-100 text-gray-800 text-center">
                View Squad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <div className="text-4xl font-bold text-primary-700">{stats?.totalPlayers || 0}</div>
              <div className="text-gray-600 mt-2">Players</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-4xl font-bold text-green-700">{stats?.matchesWon || 0}</div>
              <div className="text-gray-600 mt-2">Matches Won</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-4xl font-bold text-blue-700">{stats?.totalMatches || 0}</div>
              <div className="text-gray-600 mt-2">Total Matches</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-4xl font-bold text-purple-700">{stats?.upcomingMatches || 0}</div>
              <div className="text-gray-600 mt-2">Upcoming</div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Match Section */}
      {nextMatch && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Next Match</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 uppercase mb-2">{nextMatch.matchType?.toUpperCase()}</div>
                <h3 className="text-2xl font-bold mb-4">{nextMatch.title}</h3>
                <div className="text-xl text-gray-700 mb-4">vs {nextMatch.opponent}</div>
                <div className="flex justify-center items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(nextMatch.matchDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {nextMatch.venue}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Players Section */}
      {featuredPlayers && featuredPlayers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Players</h2>
              <Link href="/players" className="text-primary-600 hover:text-primary-700 font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPlayers.map((player: any) => (
                <div key={player._id} className="card">
                  <div className="relative h-80 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <div className="text-6xl">🏏</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{player.name}</h3>
                    <p className="text-gray-600 capitalize">{player.role}</p>
                    {player.stats && (
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Matches</div>
                          <div className="font-semibold">{player.stats.matches}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Runs</div>
                          <div className="font-semibold">{player.stats.runs}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Matches Section */}
      {recentMatches && recentMatches.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Recent Results</h2>
              <Link href="/previous-matches" className="text-primary-600 hover:text-primary-700 font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentMatches.map((match: any) => (
                <div key={match._id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">{match.title}</h3>
                    <span className={`badge badge-${match.result}`}>
                      {match.result.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Our Team</span>
                      <span className="font-semibold">{match.ourScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{match.opponent}</span>
                      <span className="font-semibold">{match.opponentScore}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    {new Date(match.matchDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured News Section */}
      {featuredNews && featuredNews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Latest News</h2>
              <Link href="/news" className="text-primary-600 hover:text-primary-700 font-semibold">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredNews.map((news: any) => (
                <div key={news._id} className="card">
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-5xl">📰</div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 mb-2">
                      {new Date(news.publishedAt).toLocaleDateString()}
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{news.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{news.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
