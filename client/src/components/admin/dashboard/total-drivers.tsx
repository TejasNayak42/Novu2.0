import { UserRoundSearch, Truck, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TotalDrivers() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <Card className="w-full">
        <CardHeader className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-3 pb-2">
          <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
          <Users className="md:h-4 md:w-4 w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">10</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-3 pb-2">
          <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
          <Truck className="md:h-4 md:w-4 w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15</div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-0 gap-3 pb-2">
          <CardTitle className="text-sm font-medium">
            Available Drivers
          </CardTitle>
          <UserRoundSearch className="md:h-4 md:w-4 w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5</div>
        </CardContent>
      </Card>
    </div>
  );
}
