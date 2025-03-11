import { supabase } from "./../src/supaBaseClient";  // Correct the import path if necessary

export const signUpUser = async (email: string, password: string) => {
  const { data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!data?.user) {
    throw new Error("Failed to sign up. No user returned.");
  }
  return data.user;
  
};
