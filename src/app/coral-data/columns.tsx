"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.

export type CoralData = {

    id: string
    created_at: string
    updated_at: string
    group: string
    tray: string
    location: string
    tle: null,
    tray_id: string
    group_id: string
    genotype: string
    qty: number,
    size: number,
    notes: string
    health_status: string

}

export const columns: ColumnDef<CoralData>[] = [
  {
    accessorKey: "genotype",
    header: "Genotype",
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "created_at",
    header: "Creation date",
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'))
      const formatted = date.toLocaleDateString()
      return <div className='font-medium'>{formatted}</div>
    }
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "tray_id",
    header: "Tray Id",
  },
  {
    accessorKey: "group_id",
    header: "Group Id",
  },
  {
    accessorKey: "health_status",
    header: "Healthy",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
]
