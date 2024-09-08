"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/utils/logout";

const Logout = () => {
  const router = useRouter();
  return (
    <Button variant={"destructive"} onClick={() => handleLogout(router)}>
      Logout
    </Button>
  );
};

export default Logout;
