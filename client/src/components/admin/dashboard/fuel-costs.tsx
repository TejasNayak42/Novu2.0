"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const fuelData = [
  { month: "January", bus: 500, truck: 400 },
  { month: "February", bus: 600, truck: 450 },
  { month: "March", bus: 550, truck: 420 },
  { month: "April", bus: 450, truck: 460 },
  { month: "May", bus: 580, truck: 490 },
  { month: "June", bus: 610, truck: 500 },
];

const fuelConfig = {
  bus: {
    label: "Bus",
    color: "hsl(var(--chart-1))",
  },
  truck: {
    label: "Truck",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function FuelCosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Consumption - Bus & Truck</CardTitle>
        <CardDescription>
          Showing total fuel spent in liters for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={fuelConfig}>
          <AreaChart
            accessibilityLayer
            data={fuelData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: any) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillBus" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-bus)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-bus)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTruck" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-truck)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-truck)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="truck"
              type="natural"
              fill="url(#fillTruck)"
              fillOpacity={0.4}
              stroke="var(--color-truck)"
              stackId="a"
            />
            <Area
              dataKey="bus"
              type="natural"
              fill="url(#fillBus)"
              fillOpacity={0.4}
              stroke="var(--color-bus)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 6.7% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
