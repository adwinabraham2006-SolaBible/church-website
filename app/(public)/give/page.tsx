import { Heart, Shield, DollarSign, Users } from 'lucide-react';

export default function GivePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Give Generously
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              &quot;Each of you should give what you have decided in your heart to give, not reluctantly
              or under compulsion, for God loves a cheerful giver.&quot;
            </p>
            <p className="text-lg text-primary-100 mt-4">
              — 2 Corinthians 9:7
            </p>
          </div>
        </div>
      </section>

      {/* Why We Give Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12 font-serif">
              Why We Give
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Worship
                </h3>
                <p className="text-neutral-600">
                  Giving is an act of worship and gratitude for all God has provided
                </p>
              </div>
              <div className="text-center">
                <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Ministry
                </h3>
                <p className="text-neutral-600">
                  Your gifts enable us to serve our community and spread the Gospel
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  Growth
                </h3>
                <p className="text-neutral-600">
                  Giving helps us grow in faith and trust in God&apos;s provision
                </p>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-neutral-700">
              <p>
                At Faith Community Church, we believe that giving is a spiritual discipline that helps
                us become more like Christ. Your generous contributions support our worship services,
                ministry programs, missions work, and facility maintenance.
              </p>
              <p>
                Every gift, regardless of size, makes a meaningful impact in advancing God&apos;s kingdom
                and serving our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tithe.ly Integration Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 font-serif">
                Give Online
              </h2>
              <p className="text-lg text-neutral-600">
                Secure and convenient online giving through Tithe.ly
              </p>
            </div>

            {/* Tithe.ly Embed Container */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              {/*
                TITHE.LY INTEGRATION INSTRUCTIONS:

                Replace the placeholder div below with your actual Tithe.ly embed code.

                Option 1 - Tithe.ly Giving Widget:
                Visit https://get.tithe.ly and sign up for an account
                Once you have your account, go to your Tithe.ly dashboard
                Navigate to: Settings > Giving Form > Get Code
                Copy the iframe embed code provided

                Option 2 - Tithe.ly Button:
                You can also use a Tithe.ly giving button that opens a modal
                The code will look something like:

                <script src="https://tithe.ly/widget/v3/give.js?3"></script>
                <tithe-ly-widget church-id="YOUR_CHURCH_ID"></tithe-ly-widget>

                Replace YOUR_CHURCH_ID with your actual Tithe.ly church ID
              */}

              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-12 text-center border-2 border-dashed border-primary-300">
                <DollarSign className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                  Tithe.ly Integration Ready
                </h3>
                <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
                  This section is configured to accept your Tithe.ly embed code. Once you have your
                  Tithe.ly account set up, simply replace this placeholder with your giving widget code.
                </p>
                <div className="bg-white rounded-lg p-6 text-left max-w-xl mx-auto">
                  <p className="text-sm font-mono text-neutral-600 mb-2">
                    To integrate Tithe.ly:
                  </p>
                  <ol className="text-sm text-neutral-700 space-y-2 list-decimal list-inside">
                    <li>Sign up at <a href="https://get.tithe.ly" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">get.tithe.ly</a></li>
                    <li>Get your embed code from your dashboard</li>
                    <li>Replace this placeholder in the code</li>
                    <li>Update the church-id parameter if using the widget</li>
                  </ol>
                </div>

                {/* Example Tithe.ly Button (Uncomment and add your church ID) */}
                {/*
                <div className="mt-8">
                  <script src="https://tithe.ly/widget/v3/give.js?3"></script>
                  <tithe-ly-widget church-id="YOUR_CHURCH_ID"></tithe-ly-widget>
                </div>
                */}
              </div>

              {/* Alternative: Temporary Give Button for Demo */}
              <div className="mt-8 text-center">
                <a
                  href="https://tithe.ly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-lg"
                >
                  <Heart className="w-5 h-5" />
                  Give Now via Tithe.ly
                </a>
                <p className="text-sm text-neutral-500 mt-4">
                  (This button will be replaced with your embedded giving form)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12 font-serif">
              Other Ways to Give
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* In-Person */}
              <div className="bg-neutral-50 rounded-xl p-6 border-2 border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  In-Person Giving
                </h3>
                <p className="text-neutral-600 mb-4">
                  You can give during any of our worship services. Offering boxes are located at
                  the back of the sanctuary.
                </p>
                <p className="text-sm text-neutral-500">
                  Sunday Services: 9:00 AM & 11:00 AM
                </p>
              </div>

              {/* Mail */}
              <div className="bg-neutral-50 rounded-xl p-6 border-2 border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Mail a Check
                </h3>
                <p className="text-neutral-600 mb-4">
                  Make checks payable to &quot;Faith Community Church&quot; and mail to:
                </p>
                <address className="text-sm text-neutral-700 not-italic">
                  Faith Community Church<br />
                  123 Faith Avenue<br />
                  Cityville, ST 12345
                </address>
              </div>

              {/* Text to Give */}
              <div className="bg-neutral-50 rounded-xl p-6 border-2 border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Text to Give
                </h3>
                <p className="text-neutral-600 mb-4">
                  Text the word <span className="font-bold">GIVE</span> to <span className="font-bold">(555) 123-4567</span> and
                  follow the prompts to complete your gift.
                </p>
                <p className="text-sm text-neutral-500">
                  Available through Tithe.ly
                </p>
              </div>

              {/* Recurring Giving */}
              <div className="bg-neutral-50 rounded-xl p-6 border-2 border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Recurring Giving
                </h3>
                <p className="text-neutral-600 mb-4">
                  Set up automatic recurring gifts through our online giving platform to support
                  the church consistently.
                </p>
                <p className="text-sm text-neutral-500">
                  Available in the Tithe.ly form above
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Transparency */}
      <section className="section-padding bg-neutral-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              Safe & Secure
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              All online transactions are processed through Tithe.ly&apos;s secure, encrypted platform.
              Your financial information is protected with bank-level security.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              Faith Community Church is a registered 501(c)(3) non-profit organization.
              All donations are tax-deductible to the full extent allowed by law.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Questions about giving? Contact us →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
