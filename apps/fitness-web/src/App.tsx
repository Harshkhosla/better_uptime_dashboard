import { Dumbbell, Sparkles, Users, CheckCircle, ArrowRight, Menu, X, Zap, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FitFlow</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">How It Works</a>
              <a href="#coaches" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Coaches</a>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-2.5 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 font-semibold shadow-lg shadow-blue-600/25">
                Get Started
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <div className="px-4 py-3 space-y-3">
              <a href="#features" className="block py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="block py-2 text-slate-700 hover:text-purple-600 transition-colors font-medium">How It Works</a>
              <a href="#coaches" className="block py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium">Coaches</a>
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/40 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-5 py-2.5 rounded-full border border-blue-200/50 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">AI-Powered Fitness Plans</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
                Your Personal
                <span className="block mt-2 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Fitness Journey
                </span>
                <span className="block mt-2">Starts Here</span>
              </h1>

              <p className="text-xl text-slate-600 leading-relaxed">
                Get personalized workout plans created by world-class coaches and refined by cutting-edge AI.
                Every plan is reviewed and customizable by expert trainers to ensure your success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 font-bold text-lg flex items-center justify-center space-x-2 shadow-xl shadow-blue-600/30">
                  <span>Start Your Transformation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white text-blue-600 px-10 py-4 rounded-full hover:bg-blue-50 transition-all font-bold text-lg border-2 border-blue-200 hover:border-blue-400 shadow-lg">
                  See Plans
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50K+</div>
                  <div className="text-sm text-slate-600 font-medium mt-1">Active Members</div>
                </div>
                <div className="w-px h-14 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">200+</div>
                  <div className="text-sm text-slate-600 font-medium mt-1">Expert Coaches</div>
                </div>
                <div className="w-px h-14 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">98%</div>
                  <div className="text-sm text-slate-600 font-medium mt-1">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl">
                  AI + Human Expertise
                </div>

                <div className="space-y-5">
                  <div className="flex items-start space-x-4 p-5 bg-gradient-to-br from-blue-50/50 to-blue-50 rounded-2xl hover:shadow-md transition-all duration-300 border border-blue-100/50">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1.5 text-lg">AI-Generated Plans</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Smart algorithms create personalized workouts based on your goals, fitness level, and preferences.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-5 bg-gradient-to-br from-purple-50/50 to-purple-50 rounded-2xl hover:shadow-md transition-all duration-300 border border-purple-100/50">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1.5 text-lg">Coach Review</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Every plan is reviewed by certified trainers who can modify and optimize it for you.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-5 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl hover:shadow-md transition-all duration-300 border border-blue-100/50">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1.5 text-lg">Continuous Adaptation</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">Your plan evolves with your progress, ensuring optimal results every step of the way.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 top-10 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
              <div className="absolute -z-10 bottom-10 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-bold uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Why Choose FitFlow?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The perfect blend of technology and human expertise to reach your fitness goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI-Powered Intelligence",
                description: "Advanced algorithms analyze your body type, goals, and progress to create the perfect workout plan that adapts to you.",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: Target,
                title: "Expert Coach Network",
                description: "Access to 200+ certified trainers who review and customize every AI-generated plan to ensure it's perfect for you.",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: TrendingUp,
                title: "Proven Results",
                description: "Join thousands who've achieved their fitness goals with our unique combination of AI precision and human wisdom.",
                gradient: "from-blue-600 to-purple-600"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-white to-blue-50/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-10`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed relative z-10">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-bold uppercase tracking-wider">Process</span>
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

            {[
              {
                step: "01",
                title: "Tell Us About You",
                description: "Share your fitness goals, current level, preferences, and any limitations. Our AI takes it all into account.",
                color: "blue"
              },
              {
                step: "02",
                title: "AI Creates Your Plan",
                description: "Our intelligent system generates a personalized workout and nutrition plan optimized for your specific needs.",
                color: "purple"
              },
              {
                step: "03",
                title: "Coach Refines & You Train",
                description: "An expert coach reviews and perfects your plan. Start training with confidence and track your amazing progress.",
                color: "blue"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border-2 border-blue-100 hover:border-blue-300 relative z-10 group">
                  <div className={`text-7xl font-black bg-gradient-to-br from-${step.color}-200 to-${step.color}-300 bg-clip-text text-transparent mb-4`}>
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
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

      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 via-transparent to-purple-600/50 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-blue-50 mb-10 leading-relaxed">
            Join 50,000+ members who trust FitFlow to help them achieve their fitness goals with AI-powered plans and expert coaching.
          </p>
          <button className="bg-white text-blue-600 px-12 py-5 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 font-bold text-lg shadow-2xl hover:shadow-white/30">
            Start Your Free Trial
          </button>
          <p className="text-blue-100 mt-6 text-sm font-medium">No credit card required • Cancel anytime</p>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">FitFlow</span>
            </div>
            <div className="text-sm text-center md:text-left text-slate-400">
              © 2025 FitFlow. All rights reserved. Built with AI and human expertise.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
