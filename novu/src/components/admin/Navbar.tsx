import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Github, Truck } from "lucide-react";
import { ModeToggle } from "../theme/ModeToggle";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-md bg-background/50 border-b">
      <div className="container flex h-14 items-center justify-between px-5">
        <Link
          className="flex hover:text-primary/75 transition-all duration-200 items-center gap-2"
          href="/"
        >
          <Truck />
        </Link>
        <div className="flex gap-5">
          <Link href="https://github.com/srajankumar/novu" target="_blank">
            <Button className="px-5 flex gap-2" variant={"outline"}>
              <span>Open Source on</span>
              <Github className="w-5 h-5" />
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
