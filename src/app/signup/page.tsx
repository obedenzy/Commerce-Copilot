"use client";

import { signup } from "@/app/auth/actions";
import AuthForm from "@/components/auth-form";
import Logo from "@/components/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      router.replace("/dashboard");
    }
    const msg = searchParams.get("message");
    if (msg) {
      setMessage(msg);
    }
  }, [router, searchParams]);


  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Enter your details to get started with Commerce Copilot.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {message && <p className="mb-4 text-sm text-destructive">{message}</p>}
            <AuthForm action={signup} buttonText="Sign Up" />
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
