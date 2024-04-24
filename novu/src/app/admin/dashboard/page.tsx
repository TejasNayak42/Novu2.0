import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/theme/ModeToggle";
import Dashboard from "@/components/admin/dashboard/Dashboard";

const Dashbard = () => {
  return (
    <div className="md:px-10 px-5">
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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
          debitis quisquam facilis quibusdam dolore accusamus minus quis
          architecto! Eos qui eveniet sit natus libero laudantium tempore sed.
          Ipsum, amet non!
        </TabsContent>
        <TabsContent value="drivers">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          accusamus pariatur rem delectus cum similique obcaecati eius quis?
          Ipsa eius incidunt facere vitae tempore deserunt accusamus praesentium
          necessitatibus atque quae.
        </TabsContent>
        <TabsContent value="add-vehicles">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          minus corporis aut atque? Eius accusamus voluptatibus labore at,
          consectetur ab sit repellendus magnam dolorum temporibus natus, sed
          similique eum veritatis.
        </TabsContent>
        <TabsContent value="vehicles">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta,
          culpa voluptas, ducimus repellendus sit illum dolores debitis
          voluptatum eum, enim in. Eligendi sunt, laborum iure necessitatibus
          eius iste dolor? Quisquam!
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashbard;
