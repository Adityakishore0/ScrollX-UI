"use client";

import * as React from "react";
import type { ColumnDef } from "@/components/ui/table";
import {
  DataTable,
  createSortableHeader,
  createAnimatedCell,
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
  {
    id: 6,
    name: "Lee Robinson",
    email: "leerobinson@example.com",
    age: 38,
    role: "Master Developer",
  },
  {
    id: 7,
    name: "Guillermo Rauch",
    email: "guillermorauch@example.com",
    age: 34,
    role: "Best Developer",
  },
  {
    id: 8,
    name: "Dan Abramov",
    email: "danabramov@example.com",
    age: 28,
    role: "Prime Developer",
  },
  {
    id: 9,
    name: "Kent C. Dodds",
    email: "kentcdodds@example.com",
    age: 30,
    role: "Epic Developer",
  },
  {
    id: 10,
    name: "Mark Zuckerberg",
    email: "markzuckerberg@example.com",
    age: 41,
    role: "Boss Developer",
  },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "id",
    header: createSortableHeader("ID"),
    cell: createAnimatedCell(true),
  },
  {
    accessorKey: "name",
    header: createSortableHeader("Name"),
    cell: createAnimatedCell(true),
  },
  {
    accessorKey: "email",
    header: createSortableHeader("Email"),
    cell: createAnimatedCell(true),
  },
  {
    accessorKey: "age",
    header: createSortableHeader("Age"),
    cell: createAnimatedCell(true),
  },
  {
    accessorKey: "role",
    header: createSortableHeader("Role"),
    cell: createAnimatedCell(true),
  },
];

export default function TableScrollableDemo() {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchable
      searchPlaceholder="Search team..."
      globalSearch
      enableScroll
      scrollHeight={300}
      stickyHeader
      columnVisibility
      enableAnimations
      staggerDelay={0.05}
      emptyMessage="No team members found."
    />
  );
}
