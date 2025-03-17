// auth.ts

import { supabase } from '../../src/supaBaseClient';  // Ensure you have the correct Supabase client import


// Check if a user is authenticated (e.g., by checking Supabase session)
export const isAuthenticated = async (): Promise<boolean> => {
  const { data, error } = await supabase.auth.getSession();  // Await the session
  if (error) {
    throw new Error(error.message);
  }
  return data.session !== null;  // Check if the session is not null
};

// Log in a user using Supabase authentication
export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data;
};


// Log out the user by removing the authentication token
export const logoutUser = async () => {
  await supabase.auth.signOut();  // Supabase has a built-in signOut method

};



// Get the current user's information (e.g., from Supabase session)
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();  // Await the session
  if (error) {
    throw new Error(error.message);
  }
  return data.session?.user || null;  // Return user info from Supabase session
};
