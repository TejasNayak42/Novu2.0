"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import BackButton from "@/components/back-button";

export default function AdminRegister() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            phone,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        toast.success("Registration successful");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid flex justify-center items-center lg:grid-cols-2 min-h-[100dvh]">
      <BackButton />
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className="mx-auto grid w-[350px] gap-6"
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Admin Registration</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                disabled={loading}
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                disabled={loading}
                id="phone"
                type="number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={loading}
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                disabled={loading}
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                disabled={loading}
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                    opacity="0.5"
                  />
                  <path
                    fill="currentColor"
                    d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                  >
                    <animateTransform
                      attributeName="transform"
                      dur="1s"
                      from="0 12 12"
                      repeatCount="indefinite"
                      to="360 12 12"
                      type="rotate"
                    />
                  </path>
                </svg>
              ) : (
                "Register"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/admin/login"
              className="underline underline-offset-2 hover:underline-offset-4"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
      <div className="hidden lg:block fixed right-0 top-0 w-1/2">
        <Image
          src="/images/auth.png"
          alt="image"
          width="500"
          height="500"
          quality={"100"}
          className="w-full object-cover h-[100dvh]"
        />
      </div>
    </div>
  );
}
