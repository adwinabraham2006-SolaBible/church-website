import React from 'react';

export default function GospelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">The Gospel</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
            &quot;What does it mean to be a Christian?&quot;
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed text-gray-700 mb-12">
            Being a Christian is not about merely identifying with a religion or subscribing to a set of moral values. Being a Christian means you have embraced what the Bible says about God, mankind, and salvation. There are at least six biblical truths that every Christian believes and has responded to:
          </p>

          {/* God Is Sovereign Creator */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6 pb-3 border-b-4 border-secondary-500">
              God Is Sovereign Creator
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-800">
              <p>
                Contemporary thinking says man is the product of evolution. But the Bible says we were created by a personal God to love, serve, and enjoy endless fellowship with Him. The creation was a creation by design and not by chance. The Bible also tells us that the original creation was good in every respect. God is the supreme ruler of all. Jesus Christ was the agent of the creation. In Him alone all things hold together. He is worthy of our absolute allegiance, obedience, and worship.
              </p>
            </div>
          </section>

          {/* God Is Holy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6 pb-3 border-b-4 border-secondary-500">
              God Is Holy
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-800">
              <p>
                God is absolutely and perfectly holy. He cannot approve of any sin. He cannot tolerate the presence of any sin. By His very nature He condemns all sin.
              </p>
              <p>
                Because He is holy, God requires those who want to follow and worship Him to be holy also. He says, &quot;You shall be holy, for I am holy&quot; (1 Peter 1:16).
              </p>
            </div>
          </section>

          {/* Mankind Is Sinful */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6 pb-3 border-b-4 border-secondary-500">
              Mankind Is Sinful
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-800">
              <p>
                According to Scripture, everyone is guilty of sin: &quot;There is no man who does not sin&quot; (1 Kings 8:46). We are all fallen from the righteousness which God demands. We are utterly incapable of understanding, loving, or pleasing God on our own. We cannot earn salvation or win God&apos;s favor. We are all sinners, both by nature and by choice.
              </p>
            </div>
          </section>

          {/* Sin Demands a Penalty */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6 pb-3 border-b-4 border-secondary-500">
              Sin Demands a Penalty
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-800">
              <p>
                Because God is holy, He cannot simply overlook or ignore sin. His justice demands a penalty: &quot;The wages of sin is death&quot; (Romans 6:23). The &quot;death&quot; spoken of here is not merely physical death, but spiritual death&mdash;eternal separation from God in conscious punishment. This is the destiny of every person apart from divine intervention.
              </p>
              <p>
                Just changing your behavior cannot erase the guilt of your sin. You cannot turn over a new leaf. The sin problem is so deep it requires a divine solution.
              </p>
            </div>
          </section>

          {/* Jesus Is Lord and Savior */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6 pb-3 border-b-4 border-secondary-500">
              Jesus Is Lord and Savior
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-800">
              <p>
                The New Testament teaches that Jesus Christ is both God and Man. He is the eternal Son of God who took on human flesh. Jesus lived a perfect life, satisfying the holiness required by God&apos;s law. Then He died on the cross as a substitute for sinners. His death paid the penalty that God&apos;s justice required for sin. Three days later, Jesus rose bodily from the grave.
              </p>
              <p>
                The Bible says, &quot;If you confess with your mouth Jesus as Lord, and believe in your heart that God raised Him from the dead, you shall be saved&quot; (Romans 10:9). This means that salvation is not earned by human effort. It is a gift of grace to those who trust Christ and acknowledge Him as the Lord of their lives.
              </p>
            </div>
          </section>

          {/* Repentance: the Character of Saving Faith */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-6 pb-3 border-b-4 border-secondary-500">
              Repentance: the Character of Saving Faith
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-800">
              <p>
                Believing in Jesus means more than mere intellectual agreement. True Christian faith includes repentance. Repentance is agreeing with God that you are sinful, confessing your sins to Him, and making a conscious choice to turn from sin and pursue Christ and obedience to Him.
              </p>
              <p>
                This doesn&apos;t mean you will attain sinless perfection. But genuine saving faith produces an increasing pattern of obedience. The Christian increasingly desires to please God and hates his own sin. Those who claim to know Christ while deliberately continuing in unrepentant sin should never be confident that they are truly saved. Genuine Christians do not treat the grace of God so lightly (Titus 2:11-14).
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 bg-primary-50 rounded-xl p-8 border-l-4 border-primary-600">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              Would You Like to Know More?
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              If you have questions about the gospel or would like to learn more about what it means to follow Jesus Christ, we would love to talk with you. Please reach out to us or join us for a service.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/about/visit"
                className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
              >
                Plan Your Visit
              </a>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
