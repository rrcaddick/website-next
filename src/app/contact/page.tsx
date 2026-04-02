import PageHero from '@/components/ui/PageHero'

export default function Contact() {
  return (
    <div className="min-h-screen">
      <PageHero
        mobileSrc="/images/contact/contact-banner.webp"
        desktopSrc="/images/contact/contact-banner.webp"
        title="Contact Us"
      />

      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-[#E5E7EB] p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#202635]">Get in Touch</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-[#202635]">Address</h3>
                <p className="text-gray-600">
                  Fairy Knowe Backpackers<br />
                  1 Dumbleton Road<br />
                  Wilderness<br />
                  Western Cape<br />
                  South Africa<br />
                  6560
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-[#202635]">Phone</h3>
                <p className="text-gray-600">
                  +27 83 443 8384
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-[#202635]">Email</h3>
                <p className="text-gray-600">
                  info@wildernessbackpackers.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-[#202635]">Reception Hours</h3>
                <p className="text-gray-600">
                  Monday - Sunday: 8AM - 8PM<br />
                  Check-in: 2PM - 8PM<br />
                  Check-out: 10AM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#E5E7EB] p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#202635]">Send us a Message</h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[#202635] font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E7D73]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#202635] font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E7D73]"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-[#202635] font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E7D73]"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#202635] font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0E7D73]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#0E7D73] hover:bg-[#073F3A] text-[#C9DD94] hover:text-[#00FF7F] px-8 py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
