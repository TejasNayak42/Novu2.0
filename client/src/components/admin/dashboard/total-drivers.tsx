"use client";

import React, { useEffect, useState } from "react";
import { UserRoundSearch, Truck, Users, Bus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalDrivers() {
  const [totalDrivers, setTotalDrivers] = useState<number | null>(null);
  const [totalVehicles, setTotalVehicles] = useState<number>(9); // Assuming static or fetched similarly
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized. Please log in.");
        return;
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/drivers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const data = await res.json();
        setTotalDrivers(data.length); // Assuming `data` is an array of drivers
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="grid grid-cols-2 gap-5 h-fit">
        <Card className="w-full">
          <CardHeader className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-3 pb-2">
            <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            <Users className="md:h-4 md:w-4 w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDrivers ?? "0"}</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-3 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Vehicles
            </CardTitle>
            <Bus className="md:h-4 md:w-4 w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVehicles}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 h-fit">
      <Card className="w-full">
        <CardHeader className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-3 pb-2">
          <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
          <Users className="md:h-4 md:w-4 w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDrivers ?? "N/A"}</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-3 pb-2">
          <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
          <Bus className="md:h-4 md:w-4 w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalVehicles}</div>
        </CardContent>
      </Card>
    </div>
  );
}
