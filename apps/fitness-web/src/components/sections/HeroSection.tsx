import { Sparkles, CheckCircle, ArrowRight, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-5 py-2.5 rounded-full border border-blue-200/50 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">
                AI-Powered Fitness Plans
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1]">
              Your Personal
              <span className="block mt-2 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Fitness Journey
              </span>
              <span className="block mt-2">Starts Here</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Get personalized workout plans created by world-class coaches and
              refined by cutting-edge AI. Every plan is reviewed and
              customizable by expert trainers to ensure your success.
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
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  50K+
                </div>
                <div className="text-sm text-slate-600 font-medium mt-1">
                  Active Members
                </div>
              </div>
              <div className="w-px h-14 bg-gradient-to-b from-blue-300 to-purple-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  200+
                </div>
                <div className="text-sm text-slate-600 font-medium mt-1">
                  Expert Coaches
                </div>
              </div>
              <div className="w-px h-14 bg-gradient-to-b from-blue-300 to-purple-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  98%
                </div>
                <div className="text-sm text-slate-600 font-medium mt-1">
                  Success Rate
                </div>
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
                    <h3 className="font-bold text-slate-900 mb-1.5 text-lg">
                      AI-Generated Plans
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Smart algorithms create personalized workouts based on
                      your goals, fitness level, and preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-5 bg-gradient-to-br from-purple-50/50 to-purple-50 rounded-2xl hover:shadow-md transition-all duration-300 border border-purple-100/50">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1.5 text-lg">
                      Coach Review
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Every plan is reviewed by certified trainers who can
                      modify and optimize it for you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-5 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl hover:shadow-md transition-all duration-300 border border-blue-100/50">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1.5 text-lg">
                      Continuous Adaptation
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Your plan evolves with your progress, ensuring optimal
                      results every step of the way.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-10 right-10 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
            <div
              className="absolute -z-10 bottom-10 left-10 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
