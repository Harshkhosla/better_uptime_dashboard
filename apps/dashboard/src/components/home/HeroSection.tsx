import { useState } from "react";

function HeroSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
      <div className="text-center">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          See everything.
          <br />
          <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Fix anything.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          AI-native platform for on-call and incident response with effortless
          monitoring, status pages, tracing, infrastructure monitoring and log
          management.
        </p>

        {/* CTA Section */}
        <div className="max-w-md mx-auto mb-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              placeholder="Your work e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-black hover:bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Start for free
            </button>
          </form>
        </div>

        {/* Enterprise Link */}
        <p className="text-gray-600">
          Looking for an enterprise solution?{" "}
          <a
            href="#"
            className="text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            Book a demo
          </a>
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
