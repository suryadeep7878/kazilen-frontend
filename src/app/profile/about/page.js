export const metadata = {
  title: "About Kazilen",
  description:
    "Learn more about Kazilen – connecting local service providers with customers.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-8 sm:px-6 md:px-10 lg:px-20">

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
          About Kazilen
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Connecting skilled workers with customers — faster, smarter, and more reliable.
        </p>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          Kazilen simplifies how people find trusted local service providers.
          Whether it’s an electrician, plumber, or home expert — we bring them
          to your doorstep with just a few taps.
        </p>
      </section>

      {/* Problem + Solution */}
      <section className="max-w-4xl mx-auto mb-12 sm:mb-16 grid gap-6 sm:gap-8 md:grid-cols-2">
        
        <div className="p-4 sm:p-5 rounded-xl border bg-gray-50">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            The Problem
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Finding reliable local workers is time-consuming and uncertain.
            There’s no easy way to compare, trust, or book services quickly.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-xl border bg-gray-50">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Our Solution
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Kazilen lets users browse services, check ratings, and book professionals
            instantly with full transparency.
          </p>
        </div>

      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          What We Offer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            "Verified service providers",
            "Instant booking system",
            "Transparent pricing",
            "Real-time updates",
            "Ratings & reviews",
            "Location-based services",
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Our Vision
        </h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          To become the go-to platform for home services across India by empowering
          local workers and delivering exceptional customer experience.
        </p>
      </section>

      {/* Connect Section */}
      <section className="max-w-3xl mx-auto mb-12 sm:mb-16 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Connect With Us
        </h2>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">

          <a
            href="https://www.instagram.com/kazilen_?igsh=MTJ3OGlzeWExd2h3aQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border rounded-xl text-sm sm:text-base hover:bg-gray-100 transition"
          >
            Instagram
          </a>

          <a
            href="https://x.com/Suryadeep911"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border rounded-xl text-sm sm:text-base hover:bg-gray-100 transition"
          >
            X (Twitter)
          </a>

          <a
            href="https://whatsapp.com/channel/0029VbCIv06BvvspNphLn80I"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border rounded-xl text-sm sm:text-base hover:bg-gray-100 transition"
          >
            WhatsApp Channel
          </a>

          {/* 🔥 Direct WhatsApp Chat (PRIMARY CTA) */}
          <a
            href="https://wa.me/919302585476"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-green-500 text-white rounded-xl text-sm sm:text-base hover:bg-green-600 transition font-semibold"
          >
            Chat on WhatsApp
          </a>

        </div>

        {/* Support + Trust */}
        <div className="mt-6 text-sm sm:text-base text-gray-700">
          📞 Support:{" "}
          <a
            href="tel:9302585476"
            className="font-semibold hover:underline"
          >
            9302585476
          </a>
        </div>

        {/* 🔥 Trust Line */}
        <p className="mt-2 text-xs sm:text-sm text-gray-500">
          Available 9 AM – 9 PM | Quick response guaranteed
        </p>
      </section>

      {/* CTA */}
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
          Join the Kazilen Network
        </h2>
        <p className="text-gray-600 mb-5 text-sm sm:text-base">
          Whether you’re a customer or a service provider, Kazilen is built for you.
        </p>

        <button className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-xl text-sm sm:text-base hover:bg-gray-800 transition active:scale-95">
          Get Started
        </button>
      </section>

    </div>
  );
}