"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { AlignRight } from "lucide-react";
import Logout from "@/components/logout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DecodedToken {
  role: string;
  name: string;
  img: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDriver, setIsDriver] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        setIsDriver(decodedToken.role === "driver");
        setName(decodedToken.name);
        setImg(decodedToken.img);
      } catch (error) {
        console.error("Invalid token", error);
        setIsDriver(false);
      }
    } else {
      setIsDriver(false);
    }
  }, []);

  if (!isDriver) {
    return (
      <div className="min-h-[100dvh] flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="2" r="0" fill="currentColor">
            <animate
              attributeName="r"
              begin="0"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(45 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.125s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(90 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.25s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(135 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.375s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(180 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.5s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(225 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.625s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(270 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.75s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(315 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.875s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
        </svg>
      </div>
    );
  }

  return (
    <div className="md:px-10 px-5 min-h-screen pb-20">
      <div className="flex justify-between py-8 items-center">
        <div className="flex justify-center items-center gap-3">
          <Avatar>
            <AvatarImage src={img} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <h1 className="font-semibold text-lg tracking-wide">Hello, {name}</h1>
        </div>
        <div className="md:flex gap-3 hidden">
          <Logout />
          <ModeToggle />
        </div>
        <div className="flex gap-3 md:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger>
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
                <AlignRight className="w-5 h-5" />
              </div>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
              <div className="flex flex-col gap-5">
                <h1 className="text-2xl font-bold">NOVU</h1>
                <Link href="/driver/dashboard">
                  <Button
                    variant={`${
                      pathname === "/driver/dashboard" ? "default" : "secondary"
                    }`}
                    className="w-full"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/driver/route">
                  <Button
                    variant={`${
                      pathname === "/driver/route" ? "default" : "secondary"
                    }`}
                    className="w-full"
                  >
                    Route
                  </Button>
                </Link>
                <Link href="/driver/parking">
                  <Button
                    variant={`${
                      pathname === "/driver/parking" ? "default" : "secondary"
                    }`}
                    className="w-full"
                  >
                    Parking
                  </Button>
                </Link>
              </div>
              <Logout />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="md:flex hidden gap-3 mb-6 bg-secondary w-fit p-2 rounded-md">
        <Link
          className={`${
            pathname === "/driver/dashboard" ? "bg-background" : ""
          } px-3 py-2 rounded-sm`}
          href="/driver/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={`${
            pathname === "/driver/route" ? "bg-background" : ""
          } px-3 py-2 rounded-sm`}
          href="/driver/route"
        >
          Route
        </Link>
        <Link
          className={`${
            pathname === "/driver/parking" ? "bg-background" : ""
          } px-3 py-2 rounded-sm`}
          href="/driver/parking"
        >
          Parking
        </Link>
      </div>
      {children}
    </div>
  );
}
