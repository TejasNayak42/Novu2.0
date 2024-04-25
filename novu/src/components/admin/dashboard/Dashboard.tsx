import React from "react";
import TotalDrivers from "./TotalDrivers";
import ActiveDrivers from "./ActiveDrivers";
import { Overview } from "./Overview";

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 pb-10">
        <TotalDrivers />
        <div className="grid grid-cols-5 gap-5">
          <div className="grid col-span-3">
            <Overview />
          </div>
          <div className="grid col-span-2">
            <ActiveDrivers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
