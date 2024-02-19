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
import {
  ArrowUpDown,
  ChevronDown,
  EditIcon,
  EyeIcon,
  Loader,
  PlusCircle,
} from "lucide-react";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { Button, buttonVariants } from "@/components/ui/button";
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

import UpdateDataProperty from "./UpdateDataProperty";
import UpdateImagesProperty from "./UpdateImagesProperty";
import UpdatePriceProperty from "./UpdatePriceProperty";
import axios from "@/lib/axiosConfig";

import Pagination from "../common/Pagination";
import { useProperties } from "@/store/useProperties";
import ButtonDeleteProperty from "./ButtonDeleteProperty";
import { Link } from "react-router-dom";
import FiltersProperties from "./FiltersProperties";
import ButtonRestore from "./ButttonRestore";
import { statusPropertiesToShow } from "../constants/statusProperties";

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
      <div className="capitalize">
        {statusPropertiesToShow[row.getValue("status") as string]}
      </div>
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
      return (
        <div className="font-medium truncate max-w-[300px] md:max-w-[600px] md:text-pretty">
          {row.getValue("description")}
        </div>
      );
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
    accessorKey: "size",
    header: () => <div className="">Metros cuadrados</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-center">{row.getValue("size")}m²</div>
      );
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
          <DropdownMenuContent className="flex items-start justify-start flex-col">
            <DropdownMenuLabel className="text-start">
              Acciones
            </DropdownMenuLabel>{" "}
            {/* actualizar información */}
            <Link
              className={`${buttonVariants({
                variant: "ghost",
              })} w-full`}
              to={`/property/${property.id}`}
            >
              Visitar <EyeIcon className="text-sm p-1" />
            </Link>
            <Sheet>
              <SheetTrigger
                className={`${buttonVariants({
                  variant: "ghost",
                })} w-full  `}
              >
                Información <EditIcon className="text-sm p-1" />
              </SheetTrigger>
              <UpdateDataProperty property={property} />
            </Sheet>
            {/* Acutalizar precios */}
            <Sheet>
              <SheetTrigger
                className={`${buttonVariants({
                  variant: "ghost",
                })} w-full`}
              >
                Precios <EditIcon className="text-sm p-1" />
              </SheetTrigger>
              <UpdatePriceProperty property={property} />
            </Sheet>
            {/* Actualizar imagenes */}
            <Sheet>
              <SheetTrigger
                className={`${buttonVariants({
                  variant: "ghost",
                })} w-full`}
              >
                Imágenes <EditIcon className="text-sm p-1" />
              </SheetTrigger>
              <UpdateImagesProperty property={property} />
            </Sheet>
            {property.deleted_at && <ButtonRestore property={property} />}
            {/*  <DropdownMenuItem>Añadir imagenes</DropdownMenuItem>
            <DropdownMenuItem>Añadir precios</DropdownMenuItem> */}
            <ButtonDeleteProperty className="mt-1" property={property} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableProperties() {
  const refresh = useProperties((state) => state.counterRefreshProperties);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [page, setPage] = useState<number>(1);
  const [links, setLinks] = useState<ResponseDataLink[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    livingrooms: "",
    kitchens: "",
    floors: "",
    type: "",
    garage: "",
    paginate: "",
  });
  const [showDeletesState, setShowDeletesState] = useState<boolean>(false);

  const getProperties = async () => {
    const res = await axios.get("/properties?page=" + page, {
      params: filters,
    });
    const firstProperty: Property = res.data.properties.data[0];
    firstProperty.deleted_at != null
      ? setShowDeletesState(true)
      : setShowDeletesState(false);

    setLoading(false);
    setLinks(res.data.properties.links);
    setProperties(res.data.properties.data);
  };

  useEffect(() => {
    getProperties();
  }, [page, refresh, filters, showDeletesState]);

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
                // column.getFacetedRowModel().rows[0].getValue("price") -> si tiene precio
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
      <FiltersProperties
        filters={filters}
        setFilters={(e: any) => setFilters(e)}
        showDeletes={true}
      />

      {showDeletesState && (
        <p className="text-xl text-center my-5 text-red-500 dark:text-red-400 ">
          {" "}
          Mostrando Eliminados{" "}
        </p>
      )}
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
        <div className=" flex p-10 items-center justify-center">
          <span>
            <Loader className="animate-spin-counter-clockwise animate-iteration-count-infinite" />
          </span>
        </div>
      )}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination setPage={(e: number) => setPage(e)} links={links} />
      </div>
    </div>
  );
}
