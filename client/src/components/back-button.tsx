import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  return (
    <Link className="fixed top-5 left-5" href={"/"}>
      <Button className="flex items-center gap-2" variant={"ghost"}>
        <ArrowLeft className="w-5 h-5" />
        Back
      </Button>
    </Link>
  );
};

export default BackButton;
