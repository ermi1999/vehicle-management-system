import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export interface Vehicle {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const fetchVehicles = async (): Promise<Vehicle[]> => {
  const { data } = await axios.get(`${BACKEND_URL}/vehicles`);
  return data;
};

const App: React.FC = () => {
  const queryClient = useQueryClient();
  const [newVehicle, setNewVehicle] = useState({ name: "", status: "" });

  const { data: vehicles } = useQuery("vehicles", fetchVehicles);

  const addVehicleMutation = useMutation(
    (vehicle: { name: string; status: string }) =>
      axios.post(`${BACKEND_URL}/vehicles`, vehicle),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("vehicles");
      },
    }
  );

  const updateVehicleMutation = useMutation(
    (vehicle: { id: string; status: string }) =>
      axios.put(`${BACKEND_URL}/vehicles/${vehicle.id}`, {
        status: vehicle.status,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("vehicles");
      },
    }
  );

  const handleAddVehicle = () => {
    addVehicleMutation.mutate(newVehicle);
    setNewVehicle({ name: "", status: "" });
  };

  return (
    <div className="w-full h-full items-center flex flex-col p-[2vw] space-y-10">
      <div className="flex flex-col space-y-2 w-full sm:w-[75%] lg:w-[25vw]">
        <Input
          placeholder="Vehicle Name"
          value={newVehicle.name}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, name: e.target.value })
          }
        />
        <Input
          placeholder="Status"
          value={newVehicle.status}
          onChange={(e) =>
            setNewVehicle({ ...newVehicle, status: e.target.value })
          }
        />
        <Button onClick={handleAddVehicle}>Add Vehicle</Button>
      </div>
      <Table>
        <TableCaption>A list of vehicles.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Updated at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles
            ? vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.name}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">{vehicle.status}</Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem
                          onClick={() => {
                            if (vehicle.status === "Available") return;
                            updateVehicleMutation.mutate({
                              id: vehicle.id,
                              status: "Available",
                            });
                          }}
                        >
                          Available
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            if (vehicle.status === "Unavailable") return;
                            updateVehicleMutation.mutate({
                              id: vehicle.id,
                              status: "Unavailable",
                            });
                          }}
                        >
                          Unavailable
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell className="text-right text-muted">
                    {new Date(vehicle.updatedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default App;
