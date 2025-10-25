export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Tell Us About You",
      description:
        "Share your fitness goals, current level, preferences, and any limitations. Our AI takes it all into account.",
      color: "blue",
    },
    {
      step: "02",
      title: "AI Creates Your Plan",
      description:
        "Our intelligent system generates a personalized workout and nutrition plan optimized for your specific needs.",
      color: "purple",
    },
    {
      step: "03",
      title: "Coach Refines & You Train",
      description:
        "An expert coach reviews and perfects your plan. Start training with confidence and track your amazing progress.",
      color: "blue",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 pt-32 bg-gradient-to-br from-blue-50 via-white to-purple-50/50 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-bold uppercase tracking-wider">
              Process
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three simple steps to your personalized fitness journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/4 left-1/3 right-1/3 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 rounded-full"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-blue-100 hover:border-blue-300 relative z-10 group">
                <div
                  className={`text-7xl font-black bg-gradient-to-br from-${step.color}-200 to-${step.color}-300 bg-clip-text text-transparent mb-4`}
                >
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-5 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 font-bold text-lg shadow-xl shadow-blue-600/30">
            Get Your Custom Plan Now
          </button>
        </div>
      </div>
    </section>
  );
}
