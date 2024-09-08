"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setUsername("");
        setPassword("");
        toast.success("Login successful");
        router.push("/admin/dashboard");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid flex justify-center items-center lg:grid-cols-2 min-h-[100dvh]">
      <div className="flex justify-center items-center">
        <form onSubmit={handleLogin} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                "Login"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/admin/register"
              className="underline underline-offset-2 hover:underline-offset-4"
            >
              Register
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
          className="w-full object-cover brightness-[0.2] grayscale h-[100dvh]"
        />
      </div>
    </div>
  );
}
