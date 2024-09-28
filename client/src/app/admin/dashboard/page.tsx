import React from "react";
import TotalDrivers from "@/components/admin/dashboard/total-drivers";
import ActiveDrivers from "@/components/admin/dashboard/active-drivers";
import { FuelCosts } from "@/components/admin/dashboard/fuel-costs";

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 pb-10">
        <div className="grid md:grid-cols-5 gap-5">
          <div className="grid md:col-span-2">
            <FuelCosts />
          </div>
          <div className="flex flex-col md:col-span-3 gap-5">
            <TotalDrivers />
            <ActiveDrivers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
