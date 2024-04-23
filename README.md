# Table Widget Component
# React + TypeScript + Vite + shadcn/ui + React Table + Tailwind

You can start reading the instructions on the documentation for Shadcn/ui:
https://ui.shadcn.com/docs/installation/vite
Provides information on the setup for the project.
# Installation

To install and use this component, follow these steps:

    Clone the repository:
git clone https://github.com/ZaidaGrilli/table-component.git

    Navigate to the project directory
cd table-component

    Install Dependencies

This component relies on the following dependencies:
Make sure to have these dependencies installed in your project environment before using the component.
    React
    Vite
    Tailwind CSS
    TansStack Tables (npm install @tanstack/react-table)
    Shadcn/ui (npm npx shadcn-ui@latest init and follow the instructions + npx shadcn-ui@latest add button + npx shadcn-ui@latest add table + npx shadcn-ui@latest add input
 + npx shadcn-ui@latest add dropdown-menu)

    lucide-react (npm install lucide-react) (icons)



# (Work In Progress)
# Instructions of use

In the file columns.tsx
Define Your Data:

    Identify the data you want to display in the table. Ensure that your data matches the shape defined by the CoralData type in the code. You may need to modify the type definition if your data structure differs.

Import Required Components:

    Make sure to import the necessary components and icons for your table setup. You may need to adjust the import paths depending on your project structure.
    import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

Set Up Column Definitions:

    Customize the columns array to match your data structure and desired column configuration. Each object in the array represents a column in the table.
    Update the accessorKey to match the keys in your data objects.
    Customize the header property to specify the column header text or component.
    Optionally, customize the cell property to define a custom rendering function for the cell content, if needed.

The table will be rendered from the App.tsx file, the " getCoralData()" function on that file currently "fetches" the data from an "API" (URL that mocks API for the sake of testing) but can be switched to fetch from somewhere else depending on your needs.
Customize the table component further based on your specific requirements. You can add additional features, styling, or functionality as needed.

(Still working on adding more functionality)
