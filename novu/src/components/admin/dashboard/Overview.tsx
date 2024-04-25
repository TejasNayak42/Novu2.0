"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Feb",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Mar",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Apr",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "May",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Jun",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Jul",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Aug",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Sep",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Oct",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Nov",
    total: Math.floor(Math.random() * 80) + 30,
  },

  {
    name: "Dec",
    total: Math.floor(Math.random() * 80) + 30,
  },
];

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Fuel Prices</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
