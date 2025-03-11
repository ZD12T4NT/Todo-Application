import { supabase } from "./supaBaseClient";

export const loginUser = async (email: string, password: string) => {
  console.log("Logging in with email:", email);  // Add a log to confirm function is triggered
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login failed:", error.message);  // Log the error to understand if there's an issue
    throw new Error(error.message);
  }

  console.log("Login successful", data);  // Log the data to check if the login was successful
  return data;  // Return the data which contains user info and session
};
