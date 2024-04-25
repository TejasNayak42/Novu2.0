import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="min-h-[100dvh] flex justify-center items-center">
      <div className="w-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/admin/register"
                className="underline hover:underline-offset-2"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex">
          <Image
            src="/assets/auth/login.svg"
            alt="Image"
            width="500"
            height="500"
            className="h-screen w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
