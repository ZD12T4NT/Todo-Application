import { useState } from "react";
import React from 'react';
import { signUpUser } from "../signUpUser"; // Import the signUpUser function
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear errors before trying again

    try {
      await signUpUser({ firstName, lastName, email, password, profilePic });
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
              type="text"
              placeholder="First Name"
              className="border p-2 w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border p-2 w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
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
            <div>
              <label className="block">Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleProfilePicUpload} className="border p-2 w-full" />
            </div>
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
      </div>
    </div>
  );
};

export default SignupPage;
