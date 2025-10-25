import { useState } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Forgot password for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 pt-20 pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-slate-600 leading-relaxed">
                We've sent password reset instructions to <br />
                <span className="font-semibold text-slate-700">{email}</span>
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50/50 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-slate-900 mb-3">
                What's next?
              </h3>
              <ol className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center mt-0.5">
                    1
                  </span>
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center mt-0.5">
                    2
                  </span>
                  <span>Click the password reset link</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center mt-0.5">
                    3
                  </span>
                  <span>Create your new password</span>
                </li>
              </ol>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold"
              >
                Send Again
              </button>

              <Link
                to="/login"
                className="w-full bg-white border-2 border-blue-200 text-blue-600 py-3 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all font-semibold text-center block"
              >
                Back to Sign In
              </Link>
            </div>

            {/* Help */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Didn't receive the email? Check your spam folder or{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/30 pt-20 pb-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FitFlow
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Reset Your Password
            </h1>
            <p className="text-slate-600">
              Enter your email address and we'll send you a link to reset your
              password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors bg-white/50"
                placeholder="john@example.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 font-bold text-lg shadow-xl shadow-blue-600/25"
            >
              Send Reset Link
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign In
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-6 pt-6 border-t border-blue-100">
            <div className="bg-blue-50/50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 text-sm mb-2">
                Security Note
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                For your security, password reset links expire after 24 hours.
                If you don't see the email, check your spam folder or contact
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
