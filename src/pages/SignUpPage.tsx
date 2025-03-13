
import { useState } from "react";
import { signUpUser } from "../signUpUser"; // Import the signUpUser function
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear errors before trying again

    try {
      await signUpUser(email, password);
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen overflow-auto">
      {/* Left Section with Form */}
      <div className="md:w-[60%] p-10 flex justify-center items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSignup} className="space-y-4">
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
              Sign Up
            </button>
          </form>
          {/* Already have an account link */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 hover:underline"
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="md:w-[40%] bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
        <img
          src="https://images.pexels.com/photos/30872674/pexels-photo-30872674/free-photo-of-dramatic-cliffs-and-coastline-of-madeira-portugal.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="signup"
          className="w-full h-full object-cover"
        />

{/* https://distantdev.netlify.app/ */}
      </div>
    </div>
  );
};

export default SignupPage;
