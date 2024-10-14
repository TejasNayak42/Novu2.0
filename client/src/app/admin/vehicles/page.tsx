"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface Vehicle {
  _id: string;
  vehicleId: string;
  plateNumber: string;
  color: string;
  year: number;
  model: string;
  longitude: number;
  latitude: number;
}

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized. Please log in.");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/vehicles`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch vehicles");

        const data = await res.json();
        setVehicles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle ID</TableHead>
            <TableHead>Plate Number</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Location (Longitude, Latitude)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={7}>
              <Skeleton className="h-4 w-40" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  if (error) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vehicle ID</TableHead>
            <TableHead>Plate Number</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Location (Longitude, Latitude)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={7}>Error: {error}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle ID</TableHead>
          <TableHead>Plate Number</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Location (Longitude, Latitude)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7}>No vehicles found</TableCell>
          </TableRow>
        ) : (
          vehicles.map((vehicle) => (
            <TableRow key={vehicle._id}>
              <TableCell>{vehicle.vehicleId}</TableCell>
              <TableCell>{vehicle.plateNumber}</TableCell>
              <TableCell>{vehicle.color}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>
                ({vehicle.longitude}, {vehicle.latitude})
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default VehicleList;
