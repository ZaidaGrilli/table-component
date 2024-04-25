"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import { ArrowUpDown } from "lucide-react"

interface DataTableProps<TData, TValue> {
  // columns: ColumnDef<TData, TValue>[]
  data: TData[],
  headers: { [key: string]: string }; //TODO use proper type (I think this would work? indicates each key is a string (representing the column accessor key) and each value is also a string (representing the column header text).)
}

export function DataTable<TData, TValue>({
  data,
  headers
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const firstRow: object = data[0] as object
  
  const columns = Object.keys(firstRow).map((key) => {
    const formattedHeader =  headers[key] || formatHeader(key)

    return {
      header: ({column}) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {formattedHeader}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      accessorKey: key,
    }
    // Helper function to format header text
    function formatHeader(key: string): string {
        // Split the key by underscores and capitalize each word
        const words = key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        // Join the words with spaces to form the formatted header
      return words.join(' ');
    }
  })


  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
  <div>

      <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Genotypes..."
          value={(table.getColumn("genotype")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("genotype")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      </div>

      <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
      {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
    </div>


  )
}
