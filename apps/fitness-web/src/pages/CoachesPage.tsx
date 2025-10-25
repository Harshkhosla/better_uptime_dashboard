export default function CoachesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Expert Coaches
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Meet our network of 200+ certified trainers who review and optimize
            every workout plan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Coach cards would go here */}
          {[1, 2, 3, 4, 5, 6].map((coach) => (
            <div
              key={coach}
              className="bg-white p-6 rounded-3xl shadow-xl border-2 border-blue-100"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">
                Coach Name {coach}
              </h3>
              <p className="text-slate-600 text-center mb-4">
                Certified Personal Trainer, Nutrition Specialist
              </p>
              <div className="flex justify-center space-x-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Strength
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  Cardio
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
