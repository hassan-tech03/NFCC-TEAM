import { getSettings } from '@/lib/supabase.queries'

export const metadata = {
  title: 'About Us - Cricket Team',
  description: 'Learn more about our cricket team',
}

export default async function AboutPage() {
  const settings = await getSettings()

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            {settings?.tagline || 'Excellence in Cricket'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Team Logo */}
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
              <div className="text-8xl">🏏</div>
            </div>
          </div>

          {/* Team Description */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {settings?.description ? (
                <p className="whitespace-pre-line">{settings.description}</p>
              ) : (
                <>
                  <p>
                    Welcome to {settings?.teamName || 'our cricket team'}! We are a passionate group of cricket
                    enthusiasts dedicated to excellence both on and off the field.
                  </p>
                  <p>
                    Our team represents the spirit of cricket - teamwork, sportsmanship, and the pursuit of
                    excellence. We compete in various formats of the game and are committed to developing
                    talent and promoting the sport we love.
                  </p>
                  <p>
                    Whether you're a player, supporter, or just a cricket fan, we welcome you to be part of
                    our journey. Follow our matches, support our players, and join us in celebrating the
                    beautiful game of cricket.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Our Values */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Teamwork</h3>
                  <p className="text-gray-600 text-sm">
                    We believe in the power of working together towards a common goal.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Excellence</h3>
                  <p className="text-gray-600 text-sm">
                    We strive for excellence in every aspect of the game.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Sportsmanship</h3>
                  <p className="text-gray-600 text-sm">
                    We play with integrity, respect, and fair play.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Passion</h3>
                  <p className="text-gray-600 text-sm">
                    Our love for cricket drives everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {settings?.contact_email && (
            <div className="card p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-4">
                Have questions or want to know more about our team?
              </p>
              <a
                href={`mailto:${settings.contact_email}`}
                className="btn-primary inline-block"
              >
                Contact Us
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
