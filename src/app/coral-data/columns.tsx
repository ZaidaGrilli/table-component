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
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
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
