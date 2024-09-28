"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Driver {
  id: string;
  username: string;
  from: string;
  to: string;
  phone: string;
}

export default function ActiveDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 3;

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
        setDrivers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Active Drivers</CardTitle>
          <CardDescription>Driver information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">From</TableHead>
                <TableHead className="hidden md:table-cell">To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-end items-center mt-4 gap-3">
            <div className="text-sm">Page 1 of 1</div>
            <Button variant={"secondary"} size={"icon"} disabled>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant={"secondary"} size={"icon"} disabled>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Active Drivers</CardTitle>
          <CardDescription>Driver information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">From</TableHead>
                <TableHead className="hidden md:table-cell">To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>No drivers found</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-end items-center mt-4 gap-3">
            <div className="text-sm">Page 1 of 1</div>
            <Button variant={"secondary"} size={"icon"} disabled>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant={"secondary"} size={"icon"} disabled>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Pagination calculations
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  // Calculate total pages
  const totalPages = Math.ceil(drivers.length / driversPerPage);

  // Handle "Next" button click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle "Previous" button click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Active Drivers</CardTitle>
        <CardDescription>Driver information</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">From</TableHead>
              <TableHead className="hidden md:table-cell">To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDrivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>
                  <div className="font-medium">{driver.username}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {driver.phone}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {driver.from}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {driver.to}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end items-center mt-4 gap-3">
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant={"secondary"}
            size={"icon"}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
