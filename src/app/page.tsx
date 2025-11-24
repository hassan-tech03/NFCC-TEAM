import Link from "next/link";
import {
  getSettings,
  getStats,
  getFeaturedPlayers,
  getNextMatch,
  getRecentMatches,
} from "@/lib/supabase.queries";

// Force dynamic rendering to prevent caching issues
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getHomeData() {
  const [settings, stats, featuredPlayers, nextMatch, recentMatches] =
    await Promise.all([
      getSettings(),
      getStats(),
      getFeaturedPlayers(),
      getNextMatch(),
      getRecentMatches(),
    ]);

  return { settings, stats, featuredPlayers, nextMatch, recentMatches };
}

export default async function HomePage() {
  const { settings, stats, featuredPlayers, nextMatch, recentMatches } =
    await getHomeData();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] sm:min-h-[700px] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Cricket Ball Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 text-9xl">🏏</div>
          <div className="absolute bottom-20 left-10 text-8xl rotate-45">
            🏏
          </div>
          <div className="absolute top-1/3 right-1/4 text-7xl -rotate-12">
            🏏
          </div>
        </div>

        <div className="relative container-custom px-4 py-20 sm:py-32">
          <div className="max-w-4xl">
            {/* Sponsor Badge - Top Right */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 animate-fade-in">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 border-2 border-white/50 hover:scale-105 transition-transform duration-300">
                <div className="text-xs sm:text-sm text-gray-500 font-medium mb-2 text-center">
                  Proudly Sponsored By
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 sm:h-16 px-3 sm:px-4 rounded-xl overflow-hidden bg-white shadow-md flex-shrink-0 flex items-center">
                    <img
                      src="https://res.cloudinary.com/dfy225ucr/image/upload/v1763979287/BHP_kxyl2l.jpg"
                      alt="Black Horse Paint"
                      className="h-8 sm:h-12 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-gray-900 whitespace-nowrap">
                      Black Horse Paint
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Premium Quality
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Logo */}
            {settings?.team_logo_url && (
              <div className="mb-8 animate-fade-in">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl backdrop-blur-sm bg-white/10">
                  <img
                    src={settings.team_logo_url}
                    alt="Team Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight animate-slide-up">
              {settings?.team_name || "Welcome to Our Team"}
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-4 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent font-bold">
                {settings?.tagline || "Excellence in Cricket"}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white/90 max-w-2xl leading-relaxed animate-slide-up delay-200">
              {settings?.description ||
                "Join us in our journey of passion, dedication, and excellence on the cricket field."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-slide-up delay-300">
              <Link
                href="/matches"
                className="group relative px-8 py-4 bg-white text-primary-700 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 text-center overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Upcoming Matches
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white font-bold transition-opacity z-20">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Upcoming Matches
                </span>
              </Link>
              <Link
                href="/players"
                className="group px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 text-center shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  View Squad
                </span>
              </Link>
            </div>

            {/* Quick Stats */}
            {stats && (
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 animate-slide-up delay-500">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stats.totalPlayers}
                  </div>
                  <div className="text-white/80 text-sm sm:text-base font-medium">
                    Players
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stats.matchesWon}
                  </div>
                  <div className="text-white/80 text-sm sm:text-base font-medium">
                    Wins
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stats.totalMatches}
                  </div>
                  <div className="text-white/80 text-sm sm:text-base font-medium">
                    Matches
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {stats.upcomingMatches}
                  </div>
                  <div className="text-white/80 text-sm sm:text-base font-medium">
                    Upcoming
                  </div>
                </div>
              </div>
            )}

            {/* Sponsor Footer in Hero */}
            <div className="mt-12 text-center animate-fade-in delay-500">
              <p className="text-white/60 text-sm sm:text-base mb-2">
                In Partnership With
              </p>
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <div className="h-8 px-2 rounded-lg overflow-hidden bg-white flex items-center">
                  <img
                    src="https://res.cloudinary.com/dfy225ucr/image/upload/v1763979287/BHP_kxyl2l.jpg"
                    alt="Black Horse Paint"
                    className="h-6 w-auto object-contain"
                  />
                </div>
                <span className="text-white font-bold text-lg">
                  Black Horse Paint
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Next Match Section */}
      {nextMatch && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Next Match</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 uppercase mb-2">
                  {nextMatch.match_type?.toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold mb-4">{nextMatch.title}</h3>
                <div className="text-xl text-gray-700 mb-4">
                  vs {nextMatch.opponent}
                </div>
                <div className="flex justify-center items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(nextMatch.match_date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
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
              <Link
                href="/players"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPlayers.map((player: any) => (
                <div key={player.id} className="card">
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
                          <div className="font-semibold">
                            {player.stats.matches}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Runs</div>
                          <div className="font-semibold">
                            {player.stats.runs}
                          </div>
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
              <Link
                href="/previous-matches"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentMatches.map((match: any) => (
                <div key={match.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">{match.title}</h3>
                    <span className={`badge badge-${match.result}`}>
                      {match.result.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-gray-600 whitespace-nowrap">
                        Our Team
                      </span>
                      <span className="font-semibold text-right">
                        {match.our_score}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-gray-600 truncate">
                        {match.opponent}
                      </span>
                      <span className="font-semibold text-right whitespace-nowrap">
                        {match.opponent_score}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    {new Date(match.match_date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sponsor Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Our Sponsor</h2>
            <p className="text-gray-600">Proudly supported by</p>
          </div>
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-12 max-w-md w-full text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                <div className="w-64 h-40 mx-auto mb-6 rounded-2xl overflow-hidden bg-white shadow-lg flex items-center justify-center p-6">
                  <img
                    src="https://res.cloudinary.com/dfy225ucr/image/upload/v1763979287/BHP_kxyl2l.jpg"
                    alt="Black Horse Paint"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Black Horse Paint
                </h3>
                <p className="text-gray-600">Premium Quality Paints</p>
              </div>
              <div className="border-t border-gray-300 pt-6">
                <p className="text-sm text-gray-500 italic">
                  "Thank you for your continued support and partnership"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
