"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { usePathname } from "next/navigation";
import { AlignRight } from "lucide-react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="md:px-10 px-5 min-h-screen">
      <div className="flex justify-between py-8 items-center">
        <div className="flex justify-center items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tl from-[#00fd00] to-background" />
          <h1 className="font-semibold text-lg tracking-wide">
            Hello, Srajan Kumar
          </h1>
        </div>
        <div className="md:flex gap-3 hidden">
          <Button variant={"destructive"}>Logout</Button>
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
            <SheetContent>
              <div className="flex flex-col justify-between h-full">
                <Button variant={"destructive"}>Logout</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="md:flex hidden gap-3 mb-6 bg-secondary w-fit p-2 rounded-md">
        <Link
          className={`${
            pathname == "/admin/dashboard" ? "bg-background" : ""
          } px-3 py-2 rounded-sm`}
          href="/admin/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={`${
            pathname == "/admin/add-drivers" ? "bg-background" : ""
          } px-3 py-2 rounded-sm`}
          href="/admin/add-drivers"
        >
          Add Drivers
        </Link>
        <Link
          className={`${
            pathname == "/admin/drivers" ? "bg-background" : ""
          } px-3 py-2 rounded-sm`}
          href="/admin/drivers"
        >
          Drivers
        </Link>
        <Link
          className={`${
            pathname == "/admin/add-vehicles" ? "bg-background" : ""
          } px-3 py-2 rounded-sm`}
          href="/admin/add-vehicles"
        >
          Add Vehicles
        </Link>
        <Link
          className={`${
            pathname == "/admin/vehicles" ? "bg-background" : ""
          } px-3 py-2 rounded-sm`}
          href="/admin/vehicles"
        >
          Vehicles
        </Link>
      </div>
      {children}
    </div>
  );
}
