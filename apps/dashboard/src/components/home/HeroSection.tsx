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
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          See everything.
          <br />
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Fix anything.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-dark-300 mb-12 max-w-4xl mx-auto leading-relaxed">
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
              className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
            >
              Start for free
            </button>
          </form>
        </div>

        {/* Enterprise Link */}
        <p className="text-dark-400">
          Looking for an enterprise solution?{" "}
          <a
            href="#"
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            Book a demo
          </a>
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
