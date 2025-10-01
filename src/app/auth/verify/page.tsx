"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const MOCK_USERS_KEY = "mock_users";
const SESSION_KEY = "session";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const type = searchParams.get("type");

    if (!email || !password || !type) {
      console.error("Verification failed: Invalid request parameters.");
      router.replace("/login?message=Invalid request.");
      return;
    }

    let users = JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]");

    if (type === "signup") {
      const existingUser = users.find((user: any) => user.email === email);
      if (existingUser) {
        console.error("Signup failed: User already exists.", { email });
        router.replace("/signup?message=User already exists. Please login.");
        return;
      }

      const newUser = {
        id: uuidv4(),
        email,
        // Don't store plaintext passwords in a real app!
        // This is for mock purposes only.
        password,
      };

      users.push(newUser);
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

      const session = { id: newUser.id, email: newUser.email };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      router.replace("/dashboard");

    } else if (type === "login") {
      const user = users.find((user: any) => user.email === email && user.password === password);
      if (user) {
        const session = { id: user.id, email: user.email };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        router.replace("/dashboard");
      } else {
        console.error("Login failed: Invalid email or password.", { email });
        router.replace("/?message=Invalid email or password.");
      }
    }
  }, [router, searchParams]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Verifying...</p>
    </div>
  );
}
