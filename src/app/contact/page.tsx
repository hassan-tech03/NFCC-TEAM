import { getSettings } from '@/lib/supabase.queries'

export const metadata = {
  title: 'Contact Us - Cricket Team',
  description: 'Get in touch with our cricket team',
}

export default async function ContactPage() {
  const settings = await getSettings()

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We'd love to hear from you
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              
              {settings?.contact_email && (
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {settings.contact_email}
                    </a>
                  </div>
                </div>
              )}

              {settings?.social_links && (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Social Media</h3>
                    <div className="flex flex-wrap gap-3">
                      {settings.social_links.facebook && (
                        <a
                          href={settings.social_links.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600"
                        >
                          Facebook
                        </a>
                      )}
                      {settings.social_links.twitter && (
                        <a
                          href={settings.social_links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600"
                        >
                          Twitter
                        </a>
                      )}
                      {settings.social_links.instagram && (
                        <a
                          href={settings.social_links.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600"
                        >
                          Instagram
                        </a>
                      )}
                      {settings.social_links.youtube && (
                        <a
                          href={settings.social_links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600"
                        >
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="card p-6">
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-primary-600 hover:text-primary-700">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/players" className="text-primary-600 hover:text-primary-700">
                    Our Squad
                  </a>
                </li>
                <li>
                  <a href="/matches" className="text-primary-600 hover:text-primary-700">
                    Upcoming Matches
                  </a>
                </li>
                <li>
                  <a href="/news" className="text-primary-600 hover:text-primary-700">
                    Latest News
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>

              <p className="text-sm text-gray-500 text-center">
                Note: This is a demo form. To make it functional, you'll need to add a form handler.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
