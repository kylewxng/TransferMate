import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await doSignInWithEmailAndPassword(email, password);
      alert("Signed in successfully");
    } catch (err) {
      setErrorMessage(err.message);
      setIsSigningIn(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
      alert("Signed in successfully");
    } catch (err) {
      setErrorMessage(err.message);
      setIsSigningIn(false);
    }
  };

  if (userLoggedIn) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4efef] font-inter">
      <div className="bg-white shadow-md p-8 w-[440px] rounded-md">
        <div className="flex justify-center mb-4">
          <img src="/images/app-logo.png" alt="Logo" className="h-18 w-18" />
        </div>

        <h1 className="text-xl font-bold text-center mb-1">
          Welcome to TransferMate
        </h1>
        <p className="text-center text-gray-600 mb-4 text-sm">
          Built from transfer students, for transfer students.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 mb-1 text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-purple-200"
              required
            />
          </div>

          <div className="mb-3 relative">
            <label className="block text-gray-700 mb-1 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-purple-200"
              required
            />
            <img
              src="/images/eyeball.png"
              alt="Toggle password visibility"
              className="absolute right-3 top-[33px] h-5 w-5 cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm font-semibold mb-3">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSigningIn}
            className={`w-full bg-gradient-to-r from-purple-500 to-blue-400 text-white py-2 text-sm rounded mt-1 mb-3 hover:opacity-90 ${
              isSigningIn && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isSigningIn ? "Signing In..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-xs mb-3">
          <button
            onClick={() => navigate("/signup")}
            className="text-gray-500 underline"
          >
            Create an account here.
          </button>
        </p>

        <div className="flex items-center my-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-500 text-xs">or continue with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className="w-full border border-gray-300 flex items-center justify-center py-2 rounded hover:bg-gray-50"
        >
          <img src="/images/google.png" alt="Google" className="h-4 w-4 mr-2" />
          <span className="text-sm">Google account</span>
        </button>
      </div>
    </div>
  );
}
