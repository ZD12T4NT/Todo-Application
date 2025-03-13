import { useState } from "react";
import { loginUser } from "../../src/loginUser";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(email, password);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen overflow-auto">
      {/* Login Section */}
      <div className="md:w-[60%] p-10 flex justify-center items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Log In</h2>
          {error && <p className="text-red-500">{error}</p>}
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
              className="bg-blue-500 text-white px-4 py-2 w-full"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Right Section with Colored Background and Sign-Up Link */}
      <div className="md:w-[40%] bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 p-10 flex items-center justify-center">
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
