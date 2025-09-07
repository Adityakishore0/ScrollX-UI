"use client";

import * as React from "react";
import {
  DataTable,
  createSortableHeader,
  createAnimatedCell,
} from "@/components/ui/table";
import { CheckboxPro } from "@/components/ui/checkbox-pro";
import type { ColumnDef } from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";

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
];


function SelectAllHeader({
  table,
  toast,
}: {
  table: {
    getIsAllRowsSelected: () => boolean;
    getIsSomeRowsSelected: () => boolean;
    toggleAllRowsSelected: (value: boolean) => void;
  };
  toast: ReturnType<typeof useToast>["toast"];
}) {
  const allSelected = table.getIsAllRowsSelected();
  const someSelected = table.getIsSomeRowsSelected();
  const prevAllSelectedRef = React.useRef(allSelected);

  React.useEffect(() => {
    if (allSelected && !prevAllSelectedRef.current) {
      toast({
        title: "All Rows Selected",
        description: "All rows in the table have been selected",
        position: "bottom-right",
      });
    }
    prevAllSelectedRef.current = allSelected;
  }, [allSelected, toast]);

  const handleSelectAll = (value: boolean) => {
    table.toggleAllRowsSelected(value);
  };

  return (
    <CheckboxPro
      key={
        allSelected
          ? "header-checked"
          : someSelected
          ? "header-indeterminate"
          : "header-unchecked"
      }
      checked={allSelected || (someSelected && "indeterminate")}
      onCheckedChange={(value) => handleSelectAll(!!value)}
      aria-label="Select all rows"
    />
  );
}

export default function TableCheckboxDemo() {
  const { toast } = useToast();

  const columns: ColumnDef<Person>[] = [
    {
      id: "select",
      header: ({ table }) => <SelectAllHeader table={table} toast={toast} />,
      cell: ({ row }) => (
        <CheckboxPro
          key={
            row.getIsSelected()
              ? `row-selected-${row.id}`
              : `row-unselected-${row.id}`
          }
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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

  return (
    <DataTable
      columns={columns}
      data={data}
      searchable
      searchPlaceholder="Search team..."
      globalSearch
      pagination
      pageSize={5}
      columnVisibility
      enableAnimations
      staggerDelay={0.05}
      emptyMessage="No team members found."
    />
  );
}
