import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supaBaseClient"; // Import the Supabase client

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle login logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset the error message

    try {
      // Attempt to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message); // If there's an error, display the error message
      } else {
        // If login is successful, navigate to the dashboard
        navigate("/dashboard");
      }
    } catch (err: any) {
      // Catch any unexpected errors
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen overflow-auto">
      {/* Login Section */}
      <div className="md:w-[60%] p-10 flex justify-center items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Log In</h2>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#001514] text-white px-4 py-2 w-full"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Right Section with Colored Background and Sign-Up Link */}
      <div className="md:w-[40%] bg-[#001514] p-10 flex items-center justify-center">
        <div className="text-white text-lg">
          <p>Don&apos;t have an account?</p>
          <a
            href="/signup"
            className="underline hover:text-gray-200"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
