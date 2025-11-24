export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-700 py-20">
        <div className="container-custom px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Our Story
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              A journey of passion, dedication, and the enduring legacy of a visionary leader
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-16">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-12">
            {/* Memorial Card - Mobile Only (appears first) */}
            <div className="lg:hidden">
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-primary-200">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl sm:text-6xl mb-2">🏏</div>
                        <p className="text-xs sm:text-sm text-gray-600 px-4">
                          In loving memory
                        </p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Muhammad Mohsin Karamat
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 font-semibold mb-4">
                    1993 - 2024
                  </p>
                  <div className="bg-primary-50 rounded-lg p-3 sm:p-4 mb-4">
                    <p className="text-sm font-semibold text-primary-900 mb-1">
                      Founder & Captain
                    </p>
                    <p className="text-xs text-primary-700">
                      2009 - 2024
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">
                    "A visionary leader whose passion for cricket and dedication to his team created a legacy that will inspire generations to come."
                  </p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* The Beginning */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">The Beginning</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Our journey began with a dream and seven passionate individuals. The team was originally formed by{" "}
                    <span className="font-semibold text-primary-700">Muhammad Mohsin Karamat (Late)</span>, a visionary leader who saw potential where others saw only challenges.
                  </p>
                  <p>
                    Starting with tape-ball cricket, these seven friends shared more than just a love for the game—they shared a vision of excellence. Under Mohsin's leadership, the team participated in numerous tournaments, celebrating victories that would lay the foundation for something greater.
                  </p>
                  <p>
                    What began as weekend matches among friends soon evolved into a competitive force. The camaraderie, the victories, and the lessons learned from defeats all contributed to building not just a team, but a brotherhood.
                  </p>
                </div>
              </div>

              {/* The Transition */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏏</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">The Transition</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    As the team grew over the next three years, Mohsin recognized that to truly compete at higher levels, a transition was necessary. With courage and determination, he led the club's evolution from tape-ball to hard-ball cricket—a decision that would define the team's future.
                  </p>
                  <p>
                    This transition wasn't easy. The team faced significant challenges: limited equipment, difficulty accessing proper grounds, and the steep learning curve of hard-ball cricket. Many would have given up, but Mohsin's unwavering dedication kept the team moving forward.
                  </p>
                  <p>
                    Through early morning practice sessions, weekend tournaments, and countless hours of training, the team slowly but surely established itself in the hard-ball cricket community. Each match was a learning experience, each season brought improvement, and the bond between team members grew stronger.
                  </p>
                </div>
              </div>

              {/* The Partnership */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">The Partnership</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    After five years of relentless effort and consistent performance, the team's dedication caught the attention of{" "}
                    <span className="font-semibold text-primary-700">Black Horse Paint</span>. This partnership marked a turning point in the team's journey.
                  </p>
                  <p>
                    With Black Horse Paint's sponsorship, the team gained access to better equipment, proper training facilities, and the resources needed to compete at higher levels. This support wasn't just financial—it was a vote of confidence in Mohsin's vision and the team's potential.
                  </p>
                  <p>
                    The partnership enabled the team to participate in more prestigious tournaments, attract talented players, and establish a reputation for excellence. Success followed success, and the team that once struggled for basic equipment was now competing with the best.
                  </p>
                </div>
              </div>

              {/* The Legacy */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border-2 border-primary-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h2 className="text-3xl font-bold text-primary-900">The Legacy</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-4">
                  <p>
                    In 2024, our beloved captain and founder, Muhammad Mohsin Karamat, sadly passed away. He served as the team's captain from 2009 to 2024, leading with wisdom, passion, and an unwavering commitment to excellence.
                  </p>
                  <p>
                    Mohsin was more than a captain—he was a mentor, a friend, and an inspiration to everyone who had the privilege of playing alongside him. His leadership style was marked by encouragement, strategic thinking, and a deep care for each team member's growth, both as players and as individuals.
                  </p>
                  <p>
                    His vision extended beyond winning matches. He dreamed of building a team that would be remembered not just for its victories, but for its character, sportsmanship, and contribution to the cricket community. He wanted to create opportunities for young players, to nurture talent, and to establish a legacy that would inspire future generations.
                  </p>
                  <p className="font-semibold text-primary-900 text-xl">
                    Today, we carry forward his dream. Every match we play, every practice session we attend, and every victory we celebrate is a tribute to his memory. His legacy continues to inspire us as we work tirelessly to take the team to the level he always envisioned.
                  </p>
                  <p className="text-center text-lg font-semibold text-primary-800 italic mt-6 pt-6 border-t-2 border-primary-300">
                    May Allah grant him the highest ranks in Jannah. Ameen.
                  </p>
                </div>
              </div>

              {/* Our Values */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💎</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-primary-900 mb-2 sm:mb-3">Excellence</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      We strive for excellence in every aspect of the game, honoring Mohsin's commitment to continuous improvement.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-2 sm:mb-3">Brotherhood</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      We are more than teammates—we are a family, supporting each other on and off the field.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 sm:mb-3">Dedication</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      We dedicate ourselves fully to the sport, our team, and the legacy we've inherited.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-2 sm:mb-3">Sportsmanship</h3>
                    <p className="text-sm sm:text-base text-gray-700">
                      We compete with integrity, respect our opponents, and uphold the spirit of cricket.
                    </p>
                  </div>
                </div>
              </div>

              {/* Looking Forward */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Looking Forward</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    As we move forward, we remain committed to the principles that Mohsin instilled in us. We continue to develop young talent, compete at the highest levels, and contribute positively to the cricket community.
                  </p>
                  <p>
                    Our partnership with Black Horse Paint remains strong, and together we're working towards new milestones. We're expanding our training programs, participating in more competitive tournaments, and building a sustainable future for the club.
                  </p>
                  <p>
                    Every member of our team understands that they're part of something bigger than themselves. They're part of a story that began with seven friends and a dream, a story of perseverance through challenges, and a story that will continue to inspire for generations to come.
                  </p>
                  <p className="font-semibold text-primary-700 text-xl">
                    This is our story. This is our legacy. This is New Friends Cricket Club.
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Memorial Card - Desktop Only */}
                <div className="hidden lg:block bg-white rounded-2xl shadow-xl p-6 border-2 border-primary-200">
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2">🏏</div>
                          <p className="text-sm text-gray-600 px-4">
                            In loving memory
                          </p>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Muhammad Mohsin Karamat
                    </h3>
                    <p className="text-lg text-gray-600 font-semibold mb-4">
                      1993 - 2024
                    </p>
                    <div className="bg-primary-50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-primary-900 mb-1">
                        Founder & Captain
                      </p>
                      <p className="text-xs text-primary-700">
                        2009 - 2024
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 italic leading-relaxed">
                      "A visionary leader whose passion for cricket and dedication to his team created a legacy that will inspire generations to come."
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4 text-center">Our Journey</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/20">
                      <span className="text-white/90">Founded</span>
                      <span className="font-bold text-xl">2009</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/20">
                      <span className="text-white/90">Years of Excellence</span>
                      <span className="font-bold text-xl">15+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90">Sponsored Since</span>
                      <span className="font-bold text-xl">2014</span>
                    </div>
                  </div>
                </div>

                {/* Sponsor Recognition */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                    Our Proud Sponsor
                  </h3>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 text-center">
                    <div className="w-32 h-20 mx-auto mb-3 bg-white rounded-lg shadow-md flex items-center justify-center p-3">
                      <img
                        src="https://res.cloudinary.com/dfy225ucr/image/upload/v1763979287/BHP_kxyl2l.jpg"
                        alt="Black Horse Paint"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Supporting our journey since 2014
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
