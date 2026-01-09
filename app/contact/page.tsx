'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - Replace with actual backend integration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Contact Form Submission:', formData);

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white py-20 md:py-28">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-primary-50 leading-relaxed">
              We&apos;d love to hear from you! Reach out with questions, prayer requests, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-serif">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Address</h3>
                      <Link
                        href="https://maps.google.com/?q=123+Faith+Avenue,+Cityville,+ST+12345"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-primary-600 transition-colors"
                      >
                        123 Faith Avenue<br />
                        Cityville, ST 12345
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Phone</h3>
                      <a
                        href="tel:+15551234567"
                        className="text-neutral-600 hover:text-primary-600 transition-colors"
                      >
                        (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                      <a
                        href="mailto:info@faithcommunity.org"
                        className="text-neutral-600 hover:text-primary-600 transition-colors"
                      >
                        info@faithcommunity.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-neutral-200 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-neutral-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Office Hours</h3>
                      <div className="text-neutral-600 text-sm space-y-1">
                        <div>Monday - Friday</div>
                        <div>9:00 AM - 5:00 PM</div>
                        <div className="mt-2">Saturday - Sunday: Closed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Times */}
              <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
                <h3 className="font-bold text-neutral-900 mb-4">Service Times</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-neutral-900">Sunday Morning</div>
                    <div className="text-neutral-700">9:00 AM - Traditional Service</div>
                    <div className="text-neutral-700">11:00 AM - Contemporary Service</div>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Wednesday Evening</div>
                    <div className="text-neutral-700">7:00 PM - Bible Study & Prayer</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-neutral-50 rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6 font-serif">
                  Send Us a Message
                </h2>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition bg-white"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition bg-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition bg-white"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition bg-white"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="visit">Planning a Visit</option>
                          <option value="ministry">Ministry Information</option>
                          <option value="prayer">Prayer Request</option>
                          <option value="events">Events & Programs</option>
                          <option value="volunteer">Volunteer Opportunities</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition resize-none bg-white"
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                ) : (
                  // Success Message
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-neutral-600">
                      Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-neutral-100 py-12">
        <div className="container-custom">
          <div className="bg-neutral-300 rounded-2xl overflow-hidden h-96 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">
                Embed your Google Maps iframe here
              </p>
              <Link
                href="https://maps.google.com/?q=123+Faith+Avenue,+Cityville,+ST+12345"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Open in Google Maps →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
