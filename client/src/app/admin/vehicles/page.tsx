"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Data {
  id: string;
  source: string;
  destination: string;
  frequency: string;
}

const data: Data[] = [
  {
    id: "1",
    source: "State Bank",
    destination: "Kunjathbail",
    frequency: "Every hour",
  },
  {
    id: "7",
    source: "State Bank",
    destination: "Urwa Store",
    frequency: "Every 15 mins",
  },
  {
    id: "13",
    source: "State Bank",
    destination: "Kottara",
    frequency: "Every hour",
  },
  {
    id: "1B",
    source: "State Bank",
    destination: "Kodical",
    frequency: "Every 15 mins",
  },
  {
    id: "31",
    source: "State Bank",
    destination: "Mannagudda Shediguri",
    frequency: "Every 20 mins",
  },
  {
    id: "31A",
    source: "State Bank",
    destination: "Lalbag Shediguri",
    frequency: "Every 20 mins",
  },
  {
    id: "31B",
    source: "State Bank",
    destination: "Dambel",
    frequency: "Every hour",
  },
  {
    id: "16",
    source: "State Bank",
    destination: "Sulthan Bathery",
    frequency: "Every 30 mins",
  },
  {
    id: "16A",
    source: "State Bank",
    destination: "Sulthan Bathery",
    frequency: "Every 30 mins",
  },
];

export default function Vehicles() {
  const [search, setSearch] = useState("");

  // Filter data based on search query
  const filteredData = data.filter(
    (vehicle) =>
      vehicle.source.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.destination.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.frequency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <div className="flex gap-2 mb-6">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          placeholder="Search by source, destination, or frequency"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setSearch("")}>Clear</Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Frequency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No vehicles found</TableCell>
              </TableRow>
            ) : (
              filteredData.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell>{vehicle.source}</TableCell>
                  <TableCell>{vehicle.destination}</TableCell>
                  <TableCell>{vehicle.frequency}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
