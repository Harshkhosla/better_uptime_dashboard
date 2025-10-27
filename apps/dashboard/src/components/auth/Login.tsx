import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/slice/authSlice";
import { Input } from "@repo/ui/Input";
import { Button } from "@repo/ui/button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMagicLink, setIsMagicLink] = useState(true);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      console.log(result, "Login response");

      // Decode the JWT token to get user ID (or fetch user details from another endpoint)
      const tokenPayload = JSON.parse(atob(result.token.split(".")[1]));

      dispatch(
        setCredentials({
          token: result.token,
          user: {
            id: tokenPayload.id,
            email: email,
          },
        }),
      );

      navigate("/home");
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      // You can add error handling here (show toast, error message, etc.)
    }
  };

  const handleSwitchToSignup = () => navigate("/signup");

  return (
    <div
      className="min-h-screen bg-dark-950 text-white font-sans relative overflow-hidden flex items-center justify-center"
      style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
        }}
      ></div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-dark-950 rounded-sm"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-dark-300">
            First time here?{" "}
            <button
              onClick={handleSwitchToSignup}
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Sign up for free.
            </button>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Your work e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required={true}
            />
          </div>

          {/* Magic Link Button */}
          {isMagicLink && (
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Send me a magic link
            </button>
          )}

          {/* Password Option */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsMagicLink(!isMagicLink)}
              className="text-dark-300 hover:text-white transition-colors"
            >
              Sign in using password
            </button>
          </div>

          {/* Password Field (when not using magic link) */}
          {!isMagicLink && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <Button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 mt-4"
              >
                Sign in
              </Button>
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-950 text-dark-400">or</span>
            </div>
          </div>

          {/* SSO Button */}
          <button
            type="button"
            className="w-full bg-dark-800 hover:bg-dark-700 text-white font-medium px-6 py-3 rounded-lg border border-dark-600 transition-all duration-200"
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
}

export default Login;
