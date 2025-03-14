import { supabase } from "./../src/supaBaseClient"; 

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePic?: string;
}

export const signUpUser = async ({ firstName, lastName, email, password, profilePic }: SignUpData) => {
  // Step 1: Sign up the user with email and password
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data?.user) {
    throw new Error(error?.message || "Failed to sign up. No user returned.");
  }

  const userId = data.user.id;

  // Step 2: Save additional user details in a 'users' table
  const { error: profileError } = await supabase.from("users").insert([
    {
      id: userId, 
      first_name: firstName,
      last_name: lastName,
      profile_pic: profilePic,
      email: email,
    },
  ]);

  if (profileError) {
    throw new Error(profileError.message);
  }

  return data.user;
};
