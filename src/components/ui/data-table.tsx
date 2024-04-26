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
  Row,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import { ArrowUpDown } from "lucide-react"

interface DataTableProps<TData, TValue> {
  // columns: ColumnDef<TData, TValue>[]
  data: TData[],
  headers: { [key: string]: {[key: string]: string }}; //TODO use proper type (I think this would work? indicates each key is a string (representing the column accessor key) and each value is also a string (representing the column header text).)
}

export function DataTable<TData, TValue>({
  data,
  headers
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const firstRow: object = data[0] as object
  
  const columns = Object.keys(firstRow).map((key) => {
  const formattedHeader =  headers[key]?.['name'] || formatHeader(key)
  const isDate = headers[key]?.type === "date"

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
      //TODO Create function that determines if the data is a date to be formated as one (I tried to mox some stuff up, but im a bit confused by the typescript
        //Also it is only applying to the Created at and not to the Updated at Column yet)
      cell: ({ row }: {row:Row<TData>}) => {
        // Check if the data is a date and format it accordingly
        return isDate ? formatDate(key, row.original) : row.original[key];
      },
    }
    // Helper function to format header text
    function formatHeader(key: string): string {
        // Split the key by underscores and capitalize each word
        const words = key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        // Join the words with spaces to form the formatted header
      return words.join(' ');
    }
  })

  function formatDate(key: string, rowData: any): string {
    // Get the value from the row data using the key
    const value = rowData[key];
  
    // Check if the value is a valid date
    const isDate = !isNaN(Date.parse(value));
  
    // If it's a date, format it
    if (isDate) {
      const date = new Date(value);
      return date.toLocaleDateString();
    }
  
    // If it's not a date, return the original value
    return value;
  }

  const [columnVisibility, setColumnVisibility] =
  React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    
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
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
