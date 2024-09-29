"use client";

import * as React from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Vehicle {
  from: any;
  to: any;
  routeID: any;
  vehicleID: any;
  _id: string;
  vehicleId: string;
  plateNumber: string;
  longitude: string;
  latitude: string;
  color: string;
  year: string;
  model: string;
}

const VehiclesList = () => {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [editingVehicle, setEditingVehicle] = React.useState<Vehicle | null>(
    null
  );

  // Fetch vehicles when component mounts
  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/vehicles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }

        const data = await response.json();
        setVehicles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleDelete = async (vehicleId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    const updatedVehicles = vehicles.filter(
      (vehicle) => vehicle._id !== vehicleId
    );
    setVehicles(updatedVehicles);

    try {
      const res = await fetch(
        `http://localhost:3001/admin/delete-vehicle/${vehicleId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete vehicle");
    } catch (err: any) {
      setError(err.message);
      setVehicles((prevVehicles) => [...prevVehicles, ...updatedVehicles]); // Rollback if failed
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle._id === editingVehicle._id ? editingVehicle : vehicle
    );
    setVehicles(updatedVehicles);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/update-vehicle`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingVehicle),
        }
      );
      if (!res.ok) throw new Error("Failed to update vehicle");
      toast.success("Vehicle details updated");
    } catch (err: any) {
      setError(err.message);
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle._id === editingVehicle._id ? vehicle : editingVehicle
        )
      );
      toast.error("Failed to update vehicle");
    }
  };

  if (loading)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Plate Number</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5}>
              <Skeleton className="h-4 w-40" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

  if (error)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Plate Number</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5}>Error: {error}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Plate Number</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Latitude</TableHead>
          <TableHead>Longitude</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle._id}>
            <TableCell>{vehicle.vehicleId}</TableCell>
            <TableCell>{vehicle.plateNumber}</TableCell>
            <TableCell>{vehicle.color}</TableCell>
            <TableCell>{vehicle.year}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.latitude}</TableCell>
            <TableCell>{vehicle.longitude}</TableCell>
            <TableCell className="flex gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button onClick={() => setEditingVehicle(vehicle)}>
                    Edit
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit Vehicle</AlertDialogTitle>
                  </AlertDialogHeader>
                  <form onSubmit={handleUpdate} className="grid gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="vehicleId">Vehicle ID</Label>
                      <Input
                        disabled
                        type="text"
                        value={editingVehicle?.vehicleId || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) =>
                            prev ? { ...prev, vehicleId: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="plateNumber">Plate Number</Label>
                      <Input
                        type="text"
                        value={editingVehicle?.plateNumber || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) =>
                            prev
                              ? { ...prev, plateNumber: e.target.value }
                              : null
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="color">Color</Label>
                      <Input
                        type="text"
                        value={editingVehicle?.color || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) =>
                            prev ? { ...prev, color: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        type="number"
                        value={editingVehicle?.year || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) =>
                            prev ? { ...prev, year: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="model">Model</Label>
                      <Input
                        type="text"
                        value={editingVehicle?.model || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) =>
                            prev ? { ...prev, model: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input
                        type="text"
                        value={editingVehicle?.latitude || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) =>
                            prev ? { ...prev, latitude: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input
                        type="text"
                        value={editingVehicle?.longitude || ""}
                        onChange={(e) =>
                          setEditingVehicle((prev) =>
                            prev ? { ...prev, longitude: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction type="submit">Save</AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                variant="destructive"
                onClick={() => handleDelete(vehicle._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VehiclesList;
