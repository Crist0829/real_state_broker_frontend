import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Loader, PlusCircle } from "lucide-react";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Property, ResponseDataLink } from "@/types";
import { useProperties } from "@/store/useProperties";
import UpdateDataProperty from "./UpdateDataProperty";
import UpdateImagesProperty from "./UpdateImagesProperty";
import UpdatePriceProperty from "./UpdatePriceProperty";
import axios from "@/lib/axiosConfig";
import { set } from "zod";
import Pagination from "../home/Pagination";
import { link } from "fs";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="">Descripción</div>,
    cell: ({ row }) => {
      return <div className="font-medium truncate max-w-[300px] md:max-w-[600px] md:text-pretty">{row.getValue("description")}</div>;
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="">Ubicación</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("location")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const property = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-start">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>{" "}
            {/* actualizar información */}
            <Sheet>
              <SheetTrigger>
                <div className="text-sm font-bold p-4 hover:cursor-pointer w-40 hover:bg-slate-300 dark:text-white dark:hover:bg-slate-800 text-start">Editar información</div>
              </SheetTrigger>
              <UpdateDataProperty property={property} />
            </Sheet>
            {/* Acutalizar precios */}
            <Sheet>
              <SheetTrigger>
              <div className="text-sm font-bold p-4 hover:cursor-pointer w-40 hover:bg-slate-300 dark:text-white dark:hover:bg-slate-800 text-start">Añadir precios</div>
              </SheetTrigger>
              <UpdatePriceProperty property={property} />
            </Sheet>
            {/* Actualizar imagenes */}
            <Sheet>
              <SheetTrigger>
              <div className="text-sm font-bold p-4 hover:cursor-pointer w-40 hover:bg-slate-300 dark:text-white dark:hover:bg-slate-800 text-start">Añadir imágenes</div>
              </SheetTrigger>
              <UpdateImagesProperty property={property} />
            </Sheet>
            {/*  <DropdownMenuItem>Añadir imagenes</DropdownMenuItem>
            <DropdownMenuItem>Añadir precios</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableProperties() {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [page, setPage] = useState(1)
  const [links, setLinks] = useState<ResponseDataLink[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const getProperties = async () => {
    const res = await axios.get('/properties?page=' + page)
    setLoading(false)
    setLinks(res.data.properties.links)
    setProperties(res.data.properties.data)
  }

  useEffect(() => {
    getProperties()
  },[page])

  const table = useReactTable({
    data: properties,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!loading ? (
        <div className="rounded-md border animate-fade-in">
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
                    );
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className=" flex p-10 items-center justify-center" >
          <span>
            <Loader className="animate-spin-counter-clockwise animate-iteration-count-infinite" />
          </span>
        </div>
      )}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination setPage={(e) => setPage(e)} links={links}/>
      </div>
    </div>
  );
}

/*  <Sheet>
          <SheetTrigger>
            <Button variant="outline">Ver más</Button>
          </SheetTrigger>
          <SheetContent side="right" className="h-screen container">
            <SheetHeader>
              <SheetTitle>Edita {property.name}</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="name"
                  placeholder={property.name}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  placeholder={property.description}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Ubicación
                </Label>
                <Input
                  id="location"
                  placeholder={property.location}
                  className="col-span-3"
                />
              </div>
              <h3 className="text-lg font-bold">Cantidad de: </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 max-w-lg  items-center gap-5">
                <Label htmlFor="floors">
                  <small className="text-sm  uppercase text-center block">
                    pisos
                  </small>
                  <Input
                    min={0}
                    name="floors"
                    type="number"
                    id="floors"
                    placeholder={property.floors.toString()}
                  />
                </Label>

                <Label htmlFor="livingrooms">
                  <small className="text-sm  uppercase text-center block">
                    livings
                  </small>
                  <Input
                    min={0}
                    type="number"
                    id="livingrooms"
                    name="livingrooms"
                    placeholder={property.livingrooms.toString()}
                  />
                </Label>

                <Label htmlFor="bathrooms">
                  <small className="text-sm  uppercase text-center block">
                    baños
                  </small>
                  <Input
                    name="bathrooms"
                    min={0}
                    type="number"
                    id="bathrooms"
                    placeholder={property.bathrooms.toString()}
                  />
                </Label>
                <Label htmlFor="kitchens">
                  <small className="text-sm  uppercase text-center block ">
                    Cocinas
                  </small>
                  <Input
                    min={0}
                    type="number"
                    name="kitchens"
                    id="kitchens"
                    placeholder={property.kitchens.toString()}
                  />
                </Label>
                <Label htmlFor="bedrooms">
                  <small className="text-sm  uppercase text-center block ">
                    dormitorios
                  </small>
                  <Input
                    min={0}
                    type="number"
                    name="bedrooms"
                    id="bedrooms"
                    placeholder={property.bedrooms.toString()}
                  />
                </Label>
              </div>

              <div className="flex items-center w-full justify-between ml-auto mr-5 my-2 gap-3">
                <Label
                  className="text-lg font-bold flex items-center gap-2"
                  htmlFor="garage"
                >
                  Tiene garage
                  <Input
                    type="checkbox"
                    checked={property.garage}
                    className="w-4 "
                    name="garage"
                    id="garage"
                  />
                </Label>

                <fieldset>
                  <legend>Estado</legend>
                  <select
                    className="text-black"
                    defaultValue={property.status}
                    defaultChecked
                    name="status"
                    id="status"
                  >
                    <option value="available">Disponible</option>
                    <option value="sold">Vendido</option>
                    <option value="rented">Rentado</option>
                  </select>
                </fieldset>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ); */
