import Link from 'next/link';
import { Book, Crown, Heart, Users, Church, Shield } from 'lucide-react';

export default function DistinctivesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Our Distinctives
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Two foundational principles that shape our identity and mission
            </p>
          </div>
        </div>
      </section>

      {/* Core Distinctives */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* High View of God */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 shadow-lg">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">
                  A High View of God
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  We emphasize God&apos;s transcendence alongside His accessibility. God is holy and transcendent in His moral purity and also transcendent in His majesty.
                </p>
              </div>

              {/* High View of Scripture */}
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-8 shadow-lg">
                <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">
                  A High View of Scripture
                </h2>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  All Scripture is inspired by God, representing the product of the breath of God. It is inherently profitable, sufficient, and authoritative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A High View of God - Details */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 w-12 h-12 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-serif">
                A High View of God
              </h2>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">God&apos;s Sovereignty</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We teach absolute divine sovereignty over all creation. Providence describes how God administrates every detail in His creation.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Salvation</h3>
                <p className="text-neutral-700 leading-relaxed">
                  God alone accomplishes spiritual rescue through regeneration—described as resurrection from spiritual death, a new creation, and spiritual birth.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Corporate Worship Focus</h3>
                <p className="text-neutral-700 leading-relaxed">
                  While believers benefit from communal worship, God remains the primary audience. We design our services to be God-centered rather than people-centered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A High View of Scripture - Details */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 w-12 h-12 rounded-lg flex items-center justify-center">
                <Book className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-serif">
                A High View of Scripture
              </h2>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-neutral-200">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Inspiration</h3>
                <p className="text-neutral-700 leading-relaxed">
                  All Scripture is inspired by God, representing the product of the breath of God.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-neutral-200">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Relevancy</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Scripture is inherently profitable and beneficial; believers need not manufacture its relevance.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-neutral-200">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Sufficiency</h3>
                <p className="text-neutral-700 leading-relaxed">
                  The Bible fully equips us for every good work and provides a sufficient resource for the Spirit to use for both our salvation and sanctification.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-neutral-200">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Authority</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Preaching means to proclaim after the manner of a king&apos;s herald, conveying formality, dignity, and divine authority requiring obedience.
                </p>
              </div>
            </div>

            {/* Worship Elements */}
            <div className="mt-12 bg-primary-50 rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <Church className="w-6 h-6 text-primary-600" />
                Worship Elements
              </h3>
              <p className="text-neutral-700 mb-4">We incorporate only biblically mandated elements:</p>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Singing Scripture-rooted music</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Prayer grounded in Scripture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Reading Scripture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Teaching Scripture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Freewill offerings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Baptism and the Lord&apos;s Table</span>
                </li>
              </ul>
            </div>

            {/* Interpretive Approach */}
            <div className="mt-8 bg-secondary-50 rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Interpretive Approach</h3>
              <p className="text-neutral-700 leading-relaxed mb-4">
                We employ a literal, grammatical, historical hermeneutic, examining language, grammar, words, culture, geography, and history. Figures of speech and allegories are interpreted using standard literary conventions.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Consecutive expository preaching represents the biblical pattern, following Old Testament and synagogue traditions of consecutive reading and exposition of the Word of God.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contemporary Applications */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 w-12 h-12 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-serif">
                Contemporary Applications
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Creation</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Genesis presents a straightforward, literal presentation of the historical events it describes. We teach six literal days and reject theistic evolution.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Women&apos;s Role</h3>
                <p className="text-neutral-700 leading-relaxed">
                  While affirming women&apos;s equal spiritual standing before God, Scripture forbids women from teaching and leading men, or in any way exercising authority over men in the context of the church.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Tongues</h3>
                <p className="text-neutral-700 leading-relaxed">
                  The gift involved miraculous, God-given capacity to communicate the truth of God&apos;s Word in human languages the speaker had never learned. We reject ecstatic outbursts and private prayer languages as unbiblical.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Changed Life</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Genuine believers demonstrate a decreasing pattern of sin and an increasing pattern of holiness.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Human Sexuality</h3>
                <p className="text-neutral-700 leading-relaxed">
                  God created only two distinct genders: male and female, established by their physiological sex at creation. Sexuality is legitimate only between a man and a woman within the context of marriage.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Marriage</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Marriage is a public, formal, and official covenant between one male and one female, intended as a life-long bond, with divorce permitted only in the case of unrepentant sexual sin or of desertion by an unbeliever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
              Ready to Learn More?
            </h2>
            <p className="text-xl text-primary-50 mb-8 leading-relaxed">
              We would love to connect with you and answer any questions you have about our beliefs and mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-primary-600 hover:bg-primary-50 font-semibold px-8 py-3 rounded-lg transition-colors">
                Contact Us
              </Link>
              <Link href="/about/beliefs" className="bg-primary-800 hover:bg-primary-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors border-2 border-white/20">
                Full Statement of Faith
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
