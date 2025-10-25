export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Features
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover all the powerful features that make FitFlow the best choice
            for your fitness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature cards would go here */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              AI Workout Generation
            </h3>
            <p className="text-slate-600">
              Advanced AI creates personalized workouts tailored to your
              specific goals and fitness level.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Expert Coach Review
            </h3>
            <p className="text-slate-600">
              Every AI-generated plan is reviewed and optimized by certified
              fitness professionals.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Progress Tracking
            </h3>
            <p className="text-slate-600">
              Advanced analytics to track your progress and adjust your plan
              automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
