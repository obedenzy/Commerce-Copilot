"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const MOCK_USERS_KEY = "mock_users";
const SESSION_KEY = "session";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// This is a mock implementation and does not securely store passwords.
// In a real application, use a secure authentication service.

export async function login(formData: FormData) {
  const data = Object.fromEntries(formData);
  const { email, password } = data;

  // In a real app, you would get this from a database.
  // We're using localStorage for this mock.
  // Since this is a server action, we can't access localStorage directly.
  // The redirection will happen on the client where localStorage is available.
  // We'll pass a token that the client can use.

  redirect(`/auth/verify?email=${email}&password=${password}&type=login`);
}

export async function signup(formData: FormData) {
  const data = Object.fromEntries(formData);

  const result = signupSchema.safeParse(data);

  if (!result.success) {
    console.error("Signup validation failed:", result.error.flatten());
    const message = result.error.errors.map((e) => e.message).join(", ");
    redirect(`/signup?message=${encodeURIComponent(message)}`);
  } else {
    const { email, password } = result.data;
    // Similar to login, we'll delegate to a client-side route
    // to handle localStorage interaction.
    redirect(`/auth/verify?email=${email}&password=${password}&type=signup`);
  }
}

export async function logout() {
  // This will be handled on the client-side, but we can trigger a redirect
  redirect("/auth/logout");
}
