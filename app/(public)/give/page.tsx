import { Heart, Shield } from 'lucide-react';
import PushPayEmbed from '@/components/PushPayEmbed';

export default function GivePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Give
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              &quot;Each of you should give what you have decided in your heart to give, not reluctantly
              or under compulsion, for God loves a cheerful giver.&quot;
            </p>
            <p className="text-lg text-primary-100 mt-4">— 2 Corinthians 9:7</p>
          </div>
        </div>
      </section>

      {/* PushPay Embed */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-10 font-serif">
              Give Online
            </h2>
            <PushPayEmbed />
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12 font-serif">
              Other Ways to Give
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">In-Person</h3>
                <p className="text-neutral-600">
                  Offering boxes are available during our Sunday worship service.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Mail a Check</h3>
                <p className="text-neutral-600 mb-3">
                  Make checks payable to <strong>Sola Bible Church</strong> and mail to:
                </p>
                <address className="text-sm text-neutral-700 not-italic">
                  Sola Bible Church<br />
                  219 King Circle<br />
                  Temple, TX 76501
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security note */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-10 h-10 text-primary-600 mx-auto mb-4" />
            <p className="text-neutral-600 leading-relaxed">
              Online giving is processed securely through PushPay. Sola Bible Church is a registered
              501(c)(3) non-profit — all donations are tax-deductible to the full extent allowed by law.
            </p>
            <div className="mt-6">
              <a href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold">
                Questions about giving? Contact us →
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
