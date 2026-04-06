import Link from 'next/link';

export default function DistinctivesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Distinctives
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Every church has its distinctives. They may be carefully thought out and articulated or simply assumed, but there will always be non-negotiable principles that guide the choices and decisions made throughout that church&apos;s ministry.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-neutral-700 leading-relaxed text-center mb-12">
              At Sola Bible Church there are two non-negotiable distinctives that support and shape all we do:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {/* High View of God */}
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">
                  1) A High View of God
                </h2>
              </div>

              {/* High View of Scripture */}
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-serif">
                  2) A High View of Scripture
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A High View of God */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-serif mb-8">
              A High View of God
            </h2>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">A Summary</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Although God is immanent—accessible to us as Abba Father—Scripture also teaches He is transcendent—exalted far above us as our Sovereign King. Therefore, He must be treated with profound reverence and respect and never taken lightly.
                </p>
                <p>
                  God&apos;s transcendence is captured in the attribute we call His <em>holiness</em>. God is holy or transcendent in two related, but ultimately distinct ways: He is transcendent in His moral purity and also transcendent in His <em>majesty</em>. He is separate or distinct from and exalted above everything else in the universe.
                </p>
                <p>
                  Our greatest prayer must always be that God&apos;s transcendence is seen and known in the worship of this church and that He therefore is both loved and feared. It is our profound desire and chief concern that in our worship we treat God as separate, distinct, set apart, majestic, and transcendent. It is only in understanding His transcendence that we can truly see the beauty of the gospel of Jesus Christ through which we are reconciled and brought near to such a great and awesome God.
                </p>
              </div>
            </div>

            {/* Chief Implications */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">The Chief Implications</h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                A high view of God compels us to emphasize several necessary implications.
              </p>

              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">God is sovereign in all things.</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    Contrary to theological perspectives in which man or even Satan is functionally in control, we believe God is absolutely sovereign over <em>everything</em> that happens in His universe. Psalm 103:19 says, &quot;The LORD has established His throne in the heavens, and His sovereignty rules over all.&quot; God has supreme and unfettered freedom and power to act. <em>Sovereign</em> is what God <em>is</em>—by virtue of being God, He rules. <em>Providence</em> is what He <em>does</em>—He carries out His rule by actually administrating every detail in His creation.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">God is sovereign in salvation.</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    A high view of God compels us to believe and teach that God alone acts to effect man&apos;s spiritual rescue. Salvation is accomplished by a sovereign act of God alone. At the moment of salvation, God initiates and accomplishes a miracle of new spiritual life called regeneration. It is a divine act of God by His Spirit through the instrument of His Word. Scripture describes God&apos;s sovereign work of regeneration as resurrection from spiritual death, a new creation, and spiritual birth.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">Worshiping God is the chief focus of corporate worship.</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    Although God intends that we benefit greatly from corporate worship, people are not the <em>primary</em> audience. When the church gathers to worship, our primary focus should be on Him. Therefore, our worship services are designed to be God-centered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A High View of Scripture */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-serif mb-8">
              A High View of Scripture
            </h2>

            {/* Summary */}
            <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">A Summary</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Since we have such profound respect for God, we also have a profound respect for His Word. The Scripture is in part the reason for the existence of the church. In 1 Timothy 3:15 Paul identifies the church as &quot;the pillar and support of the truth&quot;! That truth is found in only one source—His eternal Word. As a pillar, the church exists to hold up the truth. And as a support, the church is the foundation on which the truth rests. The church holds up the truth by teaching it and supports the truth by defending it and passing it on to the next generation. In our desire to be a genuinely biblical church, we hold to an exalted view of Scripture. God has exalted above all things His Name and His Word.
                </p>
                <p>
                  A high view of Scripture means we believe and teach several crucial attributes of Scripture.
                </p>
              </div>
            </div>

            {/* Attributes */}
            <div className="space-y-6 mb-8">
              <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8">
                <h4 className="text-xl font-bold text-neutral-900 mb-3">Inspiration</h4>
                <p className="text-neutral-700 leading-relaxed">
                  In 2 Tim. 3:16, Paul asserts that &quot;all Scripture is inspired by God,&quot; or is of divine origin. Scripture—all of it, down to the very words—is the product of the breath of God.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8">
                <h4 className="text-xl font-bold text-neutral-900 mb-3">Relevancy</h4>
                <p className="text-neutral-700 leading-relaxed">
                  In 2 Tim. 3:16, Paul also insists that all Scripture is profitable, useful, or beneficial. We don&apos;t make the Bible relevant—it simply <em>is</em> relevant! If God has breathed out His words to us, how could anything be <em>more</em> relevant?
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8">
                <h4 className="text-xl font-bold text-neutral-900 mb-3">Sufficiency</h4>
                <p className="text-neutral-700 leading-relaxed">
                  In 2 Tim. 3:15, Paul describes Scripture as &quot;able to lead you to salvation.&quot; In verse 17, he adds that the Scripture is sufficient to make us adequate, which means &quot;capable, proficient, able to meet all demands.&quot; And Scripture fully <em>equips us for every good work</em>—it completely outfits us for spiritual service. It is a sufficient resource for the Spirit to use for both our salvation and sanctification.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8">
                <h4 className="text-xl font-bold text-neutral-900 mb-3">Authority</h4>
                <p className="text-neutral-700 leading-relaxed">
                  In 2 Tim. 4:1-2, Paul demands that pastors and elders &quot;<em>preach</em> the Word.&quot; He uses the primary New Testament word for preaching that means &quot;to proclaim after the manner of a king&apos;s herald.&quot; It carries the connotation of formality, dignity, and gravity. And it explicitly means to speak with authority. Biblical preaching is not a conversation but a proclamation from God Himself that must be heard and obeyed.
                </p>
              </div>
            </div>

            {/* Chief Implications */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">The Chief Implications</h3>

              <div className="space-y-6">
                <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8">
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">Scripture is central in the services of our church.</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    In 1 Tim. 4:13-16, Paul instructs Timothy and all church leaders that their chief assignment when the church gathers is to <strong>1)</strong> read the Scripture, <strong>2)</strong> explain the Scripture, and <strong>3)</strong> apply the Scripture. Every other element of corporate worship originates with us and is addressed to God. But when we read and hear the Word of God taught, we are hearing and witnessing a divine work. <em>God</em> speaks to us through His Word. That is why the reformers taught that &quot;the greatest and principal purpose of every church service is to preach and teach God&apos;s Word&quot; and why the central focus in our corporate worship is on preaching the Bible.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8">
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">Scripture alone directs and informs the elements of our worship.</h4>
                  <div className="space-y-4 text-neutral-700 leading-relaxed">
                    <p>
                      The only acceptable worship of God is what Scripture actually prescribes. This principle—sometimes called the Regulative Principle—grows out of Sola Scriptura: the fact that the Bible is the ultimate and only inspired authority of faith and practice. The Second Commandment explicitly warns how unprescribed forms of worship become idolatry. The regulative principle asks: &quot;Where does Scripture command or sanction this practice?&quot; If Scripture does not, then the practice is not permitted in corporate worship.
                    </p>
                    <p>
                      Therefore, our worship includes only these biblically mandated elements: <strong>1)</strong> We sing the Scripture—we choose music rooted in the truth of God&apos;s Word. <strong>2)</strong> We pray the Scripture—our prayers grow out of our response to the Scripture. <strong>3)</strong> We read the Scripture. <strong>4)</strong> We teach the Scripture. <strong>5)</strong> We give our freewill offerings to see true scriptural worship supported and extended. We see the Scripture acted out in the signs or ceremonies of <strong>6)</strong> baptism and <strong>7)</strong> the Lord&apos;s Table. The fact that these are divine directives adds solemnity to what we do on Sunday, but also great joy because as we do these things with the right heart, we can be confident it honors our God.
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8">
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">Consecutive expository preaching is our normal and consistent approach to teaching the Scripture.</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    In Old Testament corporate worship, there was a consistent pattern of the consecutive reading of the law and the prophets, followed by an exposition or explanation of its meaning. When you examine the ministry of Jesus, you find that a central focus of His ministry was participation in corporate worship in the weekly synagogue services, which centered on the consecutive reading and exposition of the Word of God. Timothy&apos;s chief assignment when the church gathered publicly was to <strong>1)</strong> read the Scripture, <strong>2)</strong> teach or explain the Scripture, and <strong>3)</strong> apply the Scripture. This was true not only of the Old Testament, but of Paul&apos;s letters as well. <em>Ordinarily</em>, following the Old Testament and synagogue pattern, the reading would have been consecutive with accompanying exposition. The Word has always been central and the key element of worship. And the ministry of the Word has <em>normally</em> been the systematic, consecutive reading and explaining of God&apos;s Word.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-xl shadow-md p-6 md:p-8">
                  <h4 className="text-xl font-bold text-neutral-900 mb-3">We interpret Scripture using a literal, grammatical, historical hermeneutic.</h4>
                  <p className="text-neutral-700 leading-relaxed">
                    Every biblical text has only one unchangeable meaning determined solely by the intent of the human author and ultimately the Holy Spirit. That meaning is expressed in letters, words, and grammar. However, Scripture&apos;s meaning can be difficult at times to understand and therefore misunderstood, so it requires careful exegesis. We seek to determine the meaning of every passage in Scripture by interpreting it literally, which simply means we follow the normal rules of interpreting any literature. We examine the language, grammar, words, culture, geography, and history in a process called the grammatical-historical method. There are figures of speech, allegories, symbols, and word pictures in the Bible just as exist in other literature. But as with other literature, we interpret the Bible in its simplest, most literal sense, unless there is authorial and contextual evidence not to do so.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contemporary Applications */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 font-serif mb-6">
              Contemporary Applications
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed mb-8">
              A high view of Scripture compels us to believe and teach the straightforward statements of Scripture about controversial contemporary issues—even when a literal reading of Scripture disagrees with prevailing views, whether secular or Christian. The following is not a complete catalog of such issues but rather merely representative of how a high view of Scripture must inform our thinking.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">The Sufficiency of Scripture</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We believe that God has provided us in the Scripture with everything necessary to nurture and sustain spiritual life. That means we are committed to teaching and counseling directly and exclusively from the Word of God. We do not believe that secular psychology has any legitimate role in the sanctification of the believer.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Creation</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We believe Genesis is a straightforward, literal presentation of the historical events it describes. We teach, therefore, that God created everything in six literal days. We reject every form of theistic evolution.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">The Role of Women</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We believe that both men and women bear the image of God and that those in Christ enjoy equal spiritual standing before God. But Scripture teaches that God has assigned different roles and responsibilities to men and women. In the home, the husband is to be the gracious, loving head and the wife is to submit to her husband&apos;s leadership. God has provided equally clear roles in the church. While there are many ways women can and should serve, we believe that Scripture forbids women from teaching and leading men, or in any way exercising authority over men in the context of the church.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">The Gift of Tongues</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We believe that the gift of tongues was the miraculous, God-given capacity to communicate the truth of God&apos;s Word in human languages the speaker had never learned or studied. It was a manifestation of God&apos;s power and blessing to validate the gospel message the Apostles taught and to establish the early church. We believe that ecstatic outbursts and private prayer languages share nothing in common with the New Testament gift of tongues, and that they are patently unbiblical.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">A Changed Life</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We believe that all those whom God has genuinely saved by grace through faith alone are new creatures in Christ and will demonstrate that new life by submission to Christ and obedience to God&apos;s Word. All Christians still sin, sometimes horribly, and sometimes for extended periods without repentance. But a decreasing pattern of sin and an increasing pattern of holiness will characterize every Christian&apos;s life.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Human Sexuality</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We believe that God created mankind in His own image. In two separate acts, He created only two distinct genders: male and female. The genders of Adam and Eve were established by God and defined by their physiological sex at creation. Subsequent to creation, God determines the gender of all other humans by their physiological sex at the time of birth. Thus, all attempts to redefine human sexuality beyond the physiological male-female distinction (whether framed biologically or culturally) and all attempts to change one&apos;s birth gender are sinful rebellion against our Creator. As our Creator, God stipulates in His Word that the only legitimate and acceptable sexual desires and sexual acts are those between a man and a woman within the context of marriage.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Marriage</h3>
                <p className="text-neutral-700 leading-relaxed">
                  We believe marriage is a gift of God&apos;s common grace to all mankind as a fundamental building block of society. As the architect of marriage, God alone retains the right to define its constructs and guidelines, and He has done so in His Word. In accordance with Scripture, we teach that God&apos;s design for marriage is a public, formal, and official covenant between one male and one female. God designed the marriage covenant to be a life-long bond, with divorce permitted only in the case of unrepentant sexual sin or of desertion by an unbeliever. Although sexual sins of thought are not justification for divorce, all sexual immorality, both thoughts and behavior, must be taken seriously as a transgression against God. God intends that the union between two believers be a loving illustration of the relationship between Christ and His church, when carried out in obedience to the Bible and through the enabling power of the Holy Spirit.
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
