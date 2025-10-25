export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-transparent to-purple-600/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Life?
        </h2>
        <p className="text-xl text-blue-50 mb-10 leading-relaxed">
          Join 50,000+ members who trust FitFlow to help them achieve their
          fitness goals with AI-powered plans and expert coaching.
        </p>
        <button className="bg-white text-blue-600 px-12 py-5 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 font-bold text-lg shadow-2xl hover:shadow-white/30">
          Start Your Free Trial
        </button>
        <p className="text-blue-100 mt-6 text-sm font-medium">
          No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
}
