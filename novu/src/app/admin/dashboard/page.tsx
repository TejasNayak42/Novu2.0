import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/theme/ModeToggle";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import Drivers from "@/components/admin/drivers/Drivers";
import Vehicles from "@/components/admin/vehicles/Vehicles";
import AddDriver from "@/components/admin/drivers/AddDriver";
import AddVehicle from "@/components/admin/drivers/AddVehicle";

const Dashbard = () => {
  return (
    <div className="md:px-10 px-5 min-h-screen">
      <div className="flex justify-between py-8 items-center">
        <div className="flex justify-center items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tl from-[#00fd00] to-background" />
          <h1 className="font-semibold text-lg tracking-wide">
            Hello Srajan Kumar
          </h1>
        </div>
        <div className="flex gap-5">
          <Button variant={"destructive"}>Logout</Button>
          <ModeToggle />
        </div>
      </div>
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="add-drivers">Add Drivers</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="add-vehicles">Add Vehicles</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="add-drivers">
          <AddDriver />
        </TabsContent>
        <TabsContent value="drivers">
          <Drivers />
        </TabsContent>
        <TabsContent value="add-vehicles">
          <AddVehicle />
        </TabsContent>
        <TabsContent value="vehicles">
          <Vehicles />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashbard;
