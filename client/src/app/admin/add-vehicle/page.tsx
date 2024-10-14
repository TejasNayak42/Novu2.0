"use client";

import * as React from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddVehicles() {
  const [vehicleId, setVehicleId] = React.useState("");
  const [longitude, setLongitude] = React.useState("");
  const [latitude, setLatitude] = React.useState("");
  const [plateNumber, setPlateNumber] = React.useState("");
  const [color, setColor] = React.useState("");
  const [year, setYear] = React.useState("");
  const [model, setModel] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/admin/add-vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          vehicleId,
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude),
          plateNumber,
          color,
          year: parseInt(year),
          model,
        }),
      });

      if (response.ok) {
        toast.success("Vehicle added successfully");
        setVehicleId("");
        setLongitude("");
        setLatitude("");
        setPlateNumber("");
        setColor("");
        setYear("");
        setModel("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Error adding vehicle");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form onSubmit={handleAddVehicle} className="flex flex-col gap-5 w-full">
        <div className="grid gap-2">
          <Label htmlFor="vehicleId">Vehicle ID</Label>
          <Input
            disabled={loading}
            id="vehicleId"
            type="text"
            required
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            disabled={loading}
            id="longitude"
            type="text"
            required
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            disabled={loading}
            id="latitude"
            type="text"
            required
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="plateNumber">Plate Number</Label>
          <Input
            disabled={loading}
            id="plateNumber"
            type="text"
            required
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="color">Color</Label>
          <Input
            disabled={loading}
            id="color"
            type="text"
            required
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="year">Year</Label>
          <Input
            disabled={loading}
            id="year"
            type="number"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="model">Model</Label>
          <Input
            disabled={loading}
            id="model"
            type="text"
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding Vehicle..." : "Add Vehicle"}
        </Button>
      </form>
    </div>
  );
}
