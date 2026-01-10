export default function BeliefsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              What We Believe
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              Our doctrinal foundation rooted in God&apos;s Word
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-neutral-700 leading-relaxed">
              At Sola Bible Church, our beliefs are firmly grounded in the authoritative Word of God.
              We hold to historic, biblical Christianity as revealed in Scripture and summarized in our
              doctrinal statement below.
            </p>
          </div>
        </div>
      </section>

      {/* Doctrinal Statements */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* The Holy Scriptures */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-6 font-serif border-b-2 border-secondary-500 pb-3">
                The Holy Scriptures
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Sola Bible Church affirms that the 66 books of the Bible given to us by the Holy Spirit
                  constitute the plenary Word of God. The church teaches the Bible as objective propositional
                  revelation, verbally inspired in every word and absolutely inerrant in the original documents.
                </p>
                <p>
                  Scripture stands as the only necessary and infallible rule of faith and practice. The church
                  emphasizes dual authorship—the Holy Spirit superintended human writers through their distinct
                  personalities to produce God&apos;s Word without error in the whole or in the part.
                </p>
                <p>
                  Regarding interpretation, the church maintains there exists one true meaning: the author&apos;s
                  originally intended meaning, which is binding on all generations. The literal, grammatical-historical
                  method governs how believers should approach Scripture study.
                </p>
              </div>
            </div>

            {/* God */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-6 font-serif border-b-2 border-secondary-500 pb-3">
                God
              </h2>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4 mt-6">Nature of God</h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                The church confesses belief in one living and true God, an infinite, all-knowing, self-existent
                Spirit, perfect in all His attributes, one in essence, eternally existing in three Persons—Father,
                Son, and Holy Spirit.
              </p>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">God the Father</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  God the Father orders and executes all things according to His own purpose and grace. The church
                  teaches He initiated the creation of all things in six literal days, including the special creation
                  of man and woman. His sovereignty extends over creation, providence, and redemption.
                </p>
                <p>
                  The church emphasizes that while God decreed for His own glory all things that come to pass,
                  He remains neither the author nor approver of sin.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">God the Son</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  Jesus Christ, the second Person of the Trinity, possesses all the divine excellencies and is
                  coequal, consubstantial, and coeternal with the Father.
                </p>
                <p>
                  The incarnation involved Christ laying aside His right to the full prerogatives of coexistence
                  with God while maintaining His divine attributes. He became the God-Man, yet without sin.
                </p>
                <p className="bg-secondary-50 border-l-4 border-secondary-500 p-4 italic">
                  Jesus Christ accomplished our redemption through His perfect obedience and through the shedding
                  of His blood and sacrificial death on the cross. His death was voluntary, vicarious, substitutionary,
                  propitiatory, and redemptive.
                </p>
                <p>
                  The church affirms Christ&apos;s literal physical resurrection and current mediatorial work:
                  He now mediates as our Advocate and High Priest.
                </p>
                <p>
                  Christ&apos;s future roles include rapturing the church and establishing His millennial kingdom
                  on earth, serving as judge of all humanity.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">God the Holy Spirit</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  The Holy Spirit represents the third Member of the Trinity, a divine Person, eternal, underived,
                  possessing all the attributes of personality and deity, including intellect, emotions, will,
                  eternality, omnipresence, omniscience, omnipotence, and truthfulness.
                </p>
                <p>
                  The church teaches the Spirit executed the divine will with relation to all mankind through
                  creation, incarnation, revelation, and salvation work. His modern operations include conviction
                  of sin, sanctification, indwelling, empowering for service, and sealing believers until redemption.
                </p>
                <p>
                  Regarding spiritual gifts, the church teaches that miraculous sign gifts served to authenticate
                  apostles and have ceased. Today, only the nonrevelatory, equipping gifts function for edification.
                </p>
              </div>
            </div>

            {/* Man */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-6 font-serif border-b-2 border-secondary-500 pb-3">
                Man
              </h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  The church affirms humans were directly and immediately created by God in His image and likeness
                  with a rational nature, intelligence, volition, self-determination, and moral responsibility to God.
                </p>
                <p>
                  Humanity comprises a material body and an immaterial soul or spirit.
                </p>

                <h3 className="text-2xl font-bold text-neutral-900 mb-4 mt-6">Sin and Depravity</h3>
                <p>
                  Through Adam&apos;s disobedience, humanity lost innocence, incurred the penalty of spiritual,
                  physical and eternal death, became subject to the wrath of God, and became inherently corrupt
                  and utterly incapable of choosing or doing that which is acceptable to God apart from divine grace.
                </p>
                <p>
                  The church teaches all humans were in Adam as their legal representative and thus inherit both
                  guilt and corrupt nature. All men are thus sinners by nature, by choice, and by divine declaration.
                </p>
              </div>
            </div>

            {/* Salvation */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-6 font-serif border-b-2 border-secondary-500 pb-3">
                Salvation
              </h2>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">General Framework</h3>
              <p className="text-neutral-700 leading-relaxed mb-6 bg-secondary-50 border-l-4 border-secondary-500 p-4 italic">
                Salvation is wholly of God&apos;s grace, on the basis of the redemption of Jesus Christ and the
                merit of His shed blood, and not on the basis of any human merit or works.
              </p>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Regeneration</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  Regeneration constitutes a supernatural work by which the Holy Spirit imparts new spiritual life
                  that is instantaneous and accomplished solely by the Spirit&apos;s power through the instrumentality
                  of the Word of God.
                </p>
                <p>
                  This work enables sinners to respond in faith and repentance to the divine provision of salvation.
                  Genuine regeneration produces righteous attitudes and conduct along with good works as evidence.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Election</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  The church teaches that election is the act of God by which, before the foundation of the world,
                  He chose in Christ those whom He graciously regenerates, saves, and sanctifies.
                </p>
                <p>
                  Critically, sovereign election does not contradict or negate the responsibility of man to repent
                  and trust Christ as Savior and Lord. The church emphasizes God&apos;s election is unconditional
                  and not conditioned on any human initiative but reflects His sovereignty in harmony with His other
                  attributes, especially His omniscience, justice, holiness, wisdom, grace, and love.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Justification</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  Justification constitutes a gracious act of God by which He instantaneously forgives and declares
                  righteous those who, through faith in Christ, repent of their sins and confess Him as sovereign Lord.
                </p>
                <p>
                  This status remains totally unearned and apart from any virtue or work of man. The mechanism involves
                  the imputation of our sins to Christ and the imputation of Christ&apos;s righteousness to us.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Sanctification</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  The church distinguishes positional and progressive sanctification. Positionally, believers achieve
                  instant sanctification (set apart) unto God at salvation through declaration of holiness.
                </p>
                <p>
                  Progressively, the believer is also, by the work of the Holy Spirit, progressively sanctified.
                  Through this process, believers increasingly live a life of increasing holiness in conformity to
                  the will of God, becoming more and more like our Lord Jesus Christ.
                </p>
                <p>
                  The church denies that a true believer&apos;s normative or permanent state can be carnal or fleshly,
                  though believers experience ongoing conflict with remaining sin. All claims to the eradication of sin
                  in this life are unscriptural.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Perseverance and Security</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  All the redeemed, once saved, persevere in their faith because they are kept by God&apos;s power,
                  and are thus secure in Christ forever.
                </p>
                <p>
                  However, Christian security must not become an occasion for sinful living and carnality.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Separation</h3>
              <p className="text-neutral-700 leading-relaxed">
                Believers should maintain separation from sin, and the church commands separation from all religious
                apostasy and worldly and sinful practices.
              </p>
            </div>

            {/* The Church */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-6 font-serif border-b-2 border-secondary-500 pb-3">
                The Church
              </h2>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Nature and Formation</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  The church encompasses all who place their faith in Jesus Christ who are immediately placed by the
                  Holy Spirit into one united spiritual Body, the church, the bride of Christ, of which Christ is the Head.
                </p>
                <p>
                  The church began on the Day of Pentecost and will be completed at the coming of Christ for His own
                  at the rapture. The church represents a unique spiritual organism designed by Christ, made up of all
                  born-again believers in this present age.
                </p>
                <p>
                  Critically, the church is distinct from Israel, a mystery not revealed until this age.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Local Church Expression</h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                The establishment and continuity of local churches is clearly taught and defined in the New Testament
                Scriptures and members associate together in local assemblies.
              </p>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Leadership</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  The one supreme authority for the church is Christ. Church officers serving under Christ include
                  elders (also called bishops, pastors, and pastor-teachers), and deacons, both of whom must meet
                  biblical qualifications.
                </p>
                <p>
                  Elders function as servants maintaining a servant&apos;s heart with responsibility to equip the
                  saints for the work of service which results in the building up of the body of Christ.
                </p>
                <p>
                  The church emphasizes the autonomy of the local church, free from any external authority or control,
                  with the right of self-government.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Church Mission</h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                The church&apos;s ultimate purpose involves glorifying God through worship, serving as the pillar and
                support of His truth, mutual care and edification, and discipleship through communicating the gospel,
                baptizing them, and by teaching them to observe all that Jesus commanded.
              </p>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Spiritual Gifts</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  The church teaches God gives the church spiritual gifts for ministry. Originally, miraculous gifts
                  of divine revelation and healing temporarily confirmed apostolic authority but are no longer necessary
                  with Scripture&apos;s completion.
                </p>
                <p>
                  Today, ministering gifts equip believers for edifying one another. The church denies that anyone
                  possesses the gift of healing today, though God does hear and answer the prayer of faith.
                </p>
                <p>
                  The church declares the gift of prophecy (in the sense of receiving new revelation directly from God),
                  the gift of tongues, and the gift of the interpretation of tongues have all ceased. Only nonrevelatory,
                  equipping gifts function presently for edification.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Ordinances</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  The church recognizes two ordinances: baptism and Communion.
                </p>
                <p>
                  Christian baptism by immersion is the solemn and beautiful testimony of a believer showing forth his
                  faith in the crucified, buried, and risen Savior, and his union with Him in death to sin and resurrection
                  to a new life.
                </p>
                <p>
                  Regarding Communion, the Lord&apos;s Supper is the commemoration and proclamation of His death until
                  He comes. While the elements of Communion are only representative of the flesh and blood of Christ,
                  participation represents an actual communion with the risen Christ.
                </p>
              </div>
            </div>

            {/* Angels */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-6 font-serif border-b-2 border-secondary-500 pb-3">
                Angels
              </h2>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Holy Angels</h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                Angels are invisible spiritual beings who at times can assume bodily form. Created by God, they are
                not to be worshiped and serve to worship Him and serve the saints.
              </p>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Fallen Angels</h3>
              <p className="text-neutral-700 leading-relaxed">
                Satan was the greatest of the created angels and is the author of sin. He rebelled against God,
                taking numerous angels with him in his fall, and by introducing sin into the human race by his
                temptation of Eve. Satan represents the open and declared enemy of God and man and the prince of
                this world, who has been defeated through the death and resurrection of Jesus Christ. Ultimately,
                he shall be eternally punished in the lake of fire.
              </p>
            </div>

            {/* Last Things */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-3xl font-bold text-primary-900 mb-6 font-serif border-b-2 border-secondary-500 pb-3">
                Last Things
              </h2>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Death</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  Physical death resulted from sin and is a punishment for sin. At death, consciousness remains—the
                  soul of the lost enters conscious punishment, and the soul of the redeemed passes immediately into
                  the presence of Christ.
                </p>
                <p>
                  The redeemed will experience bodily resurrection at the rapture, when soul and body will be reunited
                  to be glorified forever with our Lord.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">The Rapture</h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                The church teaches the personal, bodily return of our Lord Jesus Christ before the seven-year tribulation
                to translate His church from this earth. Between the rapture and second coming, Christ will reward
                believers according to their works.
              </p>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">The Tribulation</h3>
              <p className="text-neutral-700 leading-relaxed mb-6">
                After the church&apos;s removal, the righteous judgments of God will be poured out upon an unbelieving
                world, with these judgments climaxed by the return of Christ in glory. This period encompasses the
                seventieth week of Daniel&apos;s prophecy.
              </p>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">The Second Coming and Millennium</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  Following tribulation, Christ will come to earth to occupy the throne of David and establish His
                  messianic kingdom for 1,000 years on the earth. The millennium represents the fulfillment of God&apos;s
                  promise to Israel to restore them to the land.
                </p>
                <p>
                  This reign will feature harmony, justice, peace, righteousness, and long life and conclude with
                  Satan&apos;s release.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Final Judgment</h3>
              <div className="space-y-4 text-neutral-700 leading-relaxed mb-6">
                <p>
                  After the millennium, Satan will deceive the nations of the earth and gather them to battle before
                  being thrown into the lake of fire. Then Christ, as judge, will resurrect and judge the unsaved
                  dead at the Great White Throne Judgment.
                </p>
                <p>
                  The unsaved will be committed to eternal conscious punishment in the lake of fire.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Eternity</h3>
              <p className="text-neutral-700 leading-relaxed">
                Following judgment, the saved will enter the eternal state of glory with God. Earth&apos;s elements
                will dissolve, replaced by a new earth, wherein only righteousness dwells with the heavenly city
                descending. This represents the eternal dwelling place of the saints, where they will forever enjoy
                fellowship with God and one another.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 font-serif">
              Questions About Our Beliefs?
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              We&apos;d love to discuss our doctrinal positions with you and answer any questions you may have.
              Feel free to reach out to our pastoral team.
            </p>
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
