"use client";

import { useEffect, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Driver {
  _id: string;
  username: string;
  phone: number;
  birthdate: string;
  blood: string;
  license: string;
  experience: number;
  imageUrl: string;
  bio: string;
  busID: string;
  routeID: string;
  from: string;
  to: string;
  time: string;
}

const data = [
  {
    id: "1",
    source: "State Bank",
    destination: "Kunjathbail",
  },
  {
    id: "7",
    source: "State Bank",
    destination: "Urwa Store",
  },
  {
    id: "13",
    source: "State Bank",
    destination: "Kottara",
  },
  {
    id: "1B",
    source: "State Bank",
    destination: "Kodical",
  },
  {
    id: "31",
    source: "State Bank",
    destination: "Mannagudda Shediguri",
  },
  {
    id: "31A",
    source: "State Bank",
    destination: "Lalbag Shediguri",
  },
  {
    id: "31B",
    source: "State Bank",
    destination: "Dambel",
  },
  {
    id: "16",
    source: "State Bank",
    destination: "Sulthan Bathery",
  },
  {
    id: "16A",
    source: "State Bank",
    destination: "Sulthan Bathery",
  },
];

const DriversList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

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
        if (!res.ok) throw new Error("Failed to fetch drivers");

        const data = await res.json();
        setDrivers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleDelete = async (driverId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    const updatedDrivers = drivers.filter((driver) => driver._id !== driverId);
    setDrivers(updatedDrivers);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/delete-driver/${driverId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete driver");
    } catch (err: any) {
      setError(err.message);
      setDrivers((prevDrivers) => [...prevDrivers, ...updatedDrivers]); // Rollback if failed
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDriver) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      return;
    }

    const updatedDrivers = drivers.map((driver) =>
      driver._id === editingDriver._id ? editingDriver : driver
    );
    setDrivers(updatedDrivers); // Optimistic update

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/update-driver`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            driverID: editingDriver._id,
            from: editingDriver.from,
            to: editingDriver.to,
            routeID: editingDriver.routeID,
            busID: editingDriver.busID,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to update driver");
    } catch (err: any) {
      setError(err.message);
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver._id === editingDriver._id ? driver : editingDriver
        )
      );
    }
  };

  const handleRouteChange = (routeID: string) => {
    const selectedRoute = data.find((route) => route.id === routeID);
    if (selectedRoute) {
      setEditingDriver((prev) =>
        prev
          ? {
              ...prev,
              from: selectedRoute.source,
              to: selectedRoute.destination,
              routeID,
            }
          : null
      );
    }
  };

  if (loading)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Bus ID</TableHead>
            <TableHead>Route ID</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={8}>
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
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Bus ID</TableHead>
            <TableHead>Route ID</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={8}>Error: {error}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Bus ID</TableHead>
          <TableHead>Route ID</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {drivers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8}>No drivers found</TableCell>
          </TableRow>
        ) : (
          drivers.map((driver) => (
            <TableRow key={driver._id}>
              <TableCell>{driver.username}</TableCell>
              <TableCell>{driver.phone}</TableCell>
              <TableCell>{driver.experience} years</TableCell>
              <TableCell>{driver.busID}</TableCell>
              <TableCell>{driver.routeID}</TableCell>
              <TableCell>{driver.from}</TableCell>
              <TableCell>{driver.to}</TableCell>
              <TableCell className="flex gap-3">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the selected driver details.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button
                        onClick={() => handleDelete(driver._id)}
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button onClick={() => setEditingDriver(driver)}>
                      Edit
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Driver</AlertDialogTitle>
                    </AlertDialogHeader>
                    <form onSubmit={handleUpdate} className="grid gap-5">
                      <div className="grid gap-2">
                        <Label htmlFor="routeID">Route ID:</Label>
                        <Select
                          onValueChange={(value) => handleRouteChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a route" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Routes</SelectLabel>
                              {data.map((route) => (
                                <SelectItem key={route.id} value={route.id}>
                                  {route.id}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="from">From:</Label>
                        <Input
                          disabled
                          type="text"
                          id="from"
                          value={editingDriver?.from || ""}
                          onChange={(e) =>
                            setEditingDriver((prev) =>
                              prev ? { ...prev, from: e.target.value } : null
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="to">To:</Label>
                        <Input
                          disabled
                          type="text"
                          id="to"
                          value={editingDriver?.to || ""}
                          onChange={(e) =>
                            setEditingDriver((prev) =>
                              prev ? { ...prev, to: e.target.value } : null
                            )
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="busID">Bus ID:</Label>
                        <Input
                          type="number"
                          id="busID"
                          value={editingDriver?.busID || ""}
                          onChange={(e) =>
                            setEditingDriver((prev) =>
                              prev ? { ...prev, busID: e.target.value } : null
                            )
                          }
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">
                          Save
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default DriversList;
