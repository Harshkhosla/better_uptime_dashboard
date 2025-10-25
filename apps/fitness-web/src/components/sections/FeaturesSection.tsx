import { Zap, Target, TrendingUp } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Intelligence",
      description:
        "Advanced algorithms analyze your body type, goals, and progress to create the perfect workout plan that adapts to you.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Target,
      title: "Expert Coach Network",
      description:
        "Access to 200+ certified trainers who review and customize every AI-generated plan to ensure it's perfect for you.",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description:
        "Join thousands who've achieved their fitness goals with our unique combination of AI precision and human wisdom.",
      gradient: "from-blue-600 to-purple-600",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-bold uppercase tracking-wider">
              Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Why Choose FitFlow?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The perfect blend of technology and human expertise to reach your
            fitness goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-white to-blue-50/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div
                className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-10`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed relative z-10">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
