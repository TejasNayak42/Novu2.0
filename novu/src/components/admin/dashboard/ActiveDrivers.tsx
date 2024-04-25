import { Badge } from "@/components/ui/badge";
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

export default function ActiveDrivers() {
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
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">Sale</TableCell>

              <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Olivia Smith</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  olivia@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">Refund</TableCell>

              <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
