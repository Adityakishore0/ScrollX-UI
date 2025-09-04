"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

type Person = {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
};

const data: Person[] = [
  {
    id: 1,
    name: "shadcn",
    email: "shadcn@example.com",
    age: 26,
    role: "Pro Developer",
  },
  {
    id: 2,
    name: "Ahdeetai",
    email: "ahdeetai@example.com",
    age: 21,
    role: "Cool Developer",
  },
  {
    id: 3,
    name: "ManuArora",
    email: "manuarora@example.com",
    age: 35,
    role: "Ace Developer",
  },
  {
    id: 4,
    name: "DavidHaz",
    email: "davidhaz@example.com",
    age: 27,
    role: "Top Developer",
  },
  {
    id: 5,
    name: "Roy",
    email: "roy@example.com",
    age: 31,
    role: "Star Developer",
  },
];

export default function TableDemo() {
  return (
    <Table className="min-w-[600px]">
      <TableCaption>
        Team roster (basic table using head/body/footer)
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.id}</TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.email}</TableCell>
            <TableCell>{p.age}</TableCell>
            <TableCell>{p.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="text-right font-medium">
            Total members
          </TableCell>
          <TableCell className="font-bold">{data.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
