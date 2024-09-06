import React from "react";
import TotalDrivers from "@/components/admin/dashboard/total-drivers";
import ActiveDrivers from "@/components/admin/dashboard/active-drivers";
import { FuelCosts } from "@/components/admin/dashboard/fuel-costs";

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 pb-10">
        <TotalDrivers />
        <div className="grid md:grid-cols-5 gap-5">
          <div className="grid md:col-span-2">
            <FuelCosts />
          </div>
          <div className="grid md:col-span-3">
            <ActiveDrivers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
