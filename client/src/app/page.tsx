"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTable, Column } from "react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ModeToggle } from "@/components/mode-toggle";

export type Data = {
  id: string;
  source: string;
  destination: string;
  frequency: string;
};

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

export default function Home() {
  const columns: Column<Data>[] = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id" as const,
      },
      {
        Header: "Source",
        accessor: "source" as const,
      },
      {
        Header: "Destination",
        accessor: "destination" as const,
      },
      {
        Header: "Frequency",
        accessor: "frequency" as const,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <main className="flex py-40 flex-col gap-5 max-w-xl mx-auto w-full px-5">
        <h1 className="md:text-5xl text-4xl font-bold">NOVU</h1>
        <div className="text-lg text-primary/70">A fleet management app.</div>
        <div className="flex gap-4 items-center">
          <Link href="/admin/login" className="w-full">
            <Button className="h-10 w-full">Admin Login</Button>
          </Link>
          <Link href="/driver/login" className="w-full">
            <Button className="h-10 w-full" variant={"outline"}>
              Driver Login
            </Button>
          </Link>
        </div>
      </main>

      <div className="max-w-4xl mx-auto px-5 pb-20">
        <h1 className="text-2xl font-semibold pb-2 border-b">About</h1>
        <p className="pt-2">
          Novu is a comprehensive fleet management application designed to help
          fleet managers efficiently manage their vehicles and drivers, while
          also providing drivers with the information they need to complete
          their routes and parking assignments.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-20">
        <h1 className="text-2xl font-semibold pb-2">Data</h1>
        <div className="rounded-md border mt-2">
          <Table {...getTableProps()}>
            <TableHeader>
              {headerGroups.map((headerGroup, index) => (
                <div key={index}>
                  <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <TableHead
                        className="text-base"
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </TableHead>
                    ))}
                  </TableRow>
                </div>
              ))}
            </TableHeader>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <div key={index}>
                    <TableRow {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <TableCell
                          className="text-base"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      ))}
                    </TableRow>
                  </div>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <footer className="max-w-4xl flex items-center justify-between text-sm mx-auto px-5 pb-20">
        <div>
          Developed by{" "}
          <Link
            href={"https://srajan.vercel.app"}
            target="_blank"
            className="underline underline-offset-2 hover:underline-offset-4"
          >
            Srajan Kumar
          </Link>{" "}
          &{" "}
          <Link
            href={"https://www.tejasnayak.tech"}
            target="_blank"
            className="underline underline-offset-2 hover:underline-offset-4"
          >
            Tejas Nayak B
          </Link>
        </div>
        <ModeToggle />
      </footer>
    </>
  );
}
