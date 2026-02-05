import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/slice/authSlice";

function Signup() {
  const [email, setEmail] = useState("harshkhosla9945@gmail.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signup({ email, password }).unwrap();
    dispatch(
      setCredentials({
        user: { email: email },
        token: result?.user?.token || "",
      }),
    );
    console.log(result, "sdvkjsdvkvdjvn");
    navigate("/");
  };

  const handleSwitchToLogin = () => navigate("/login");

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 font-sans relative overflow-hidden flex items-center justify-center"
      style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black opacity-5 rounded-full filter blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-900/10 p-10 border border-gray-200">
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg"></div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sign up for free
            </h1>
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={handleSwitchToLogin}
                className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
              >
              Sign in.
            </button>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              <span className="text-red-500">*</span> Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              <span className="text-red-500">*</span> Password
            </label>
            <input
              id="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-base font-semibold text-gray-900 mb-2"
            >
              <span className="text-red-500">*</span> Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-black hover:bg-yellow-600 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-base"
          >
            Next
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-medium">or</span>
            </div>
          </div>

          {/* SSO Button */}
          <button
            type="button"
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-4 rounded-xl border-2 border-gray-300 transition-all duration-200 text-base"
          >
            Single Sign-On (SSO)
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-dark-400">
          <p>
            You acknowledge that you read, and agree to our{" "}
            <a
              href="#"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and our{" "}
            <a
              href="#"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
</div>
  )

}

export default Signup
