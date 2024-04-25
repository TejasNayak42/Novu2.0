import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="pt-32 pb-20">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold pb-2">Novu</h1>
      <p className="text-primary/75 dark:text-primary/50 font-medium">
        A fleet management app
      </p>
      <div className="mt-5 flex gap-5">
        <Link href="/admin/login">
          <Button className="px-10">Admin</Button>
        </Link>
        <Link href="/driver/login">
          <Button className="px-10">Driver</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
