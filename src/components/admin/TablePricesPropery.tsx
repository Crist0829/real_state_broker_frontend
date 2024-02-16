import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreatePrice, Property } from "@/types";

export function TablePricesProperty({
  property,
  prices,
}: {
  property: Property;
  prices: CreatePrice[];
}) {
  return (
    <Table>
      <TableCaption>Precios de {property.name}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prices.map((price) => (
          <TableRow key={price.name}>
            <TableCell className="font-medium">{price.name}</TableCell>
            <TableCell>{price.description}</TableCell>
            <TableCell>{price.type}</TableCell>
            <TableCell className="text-right">{price.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>{prices.length}</TableCell>
          <TableCell className="text-right">
            {prices
              .reduce((value, current) => {
                return value + current.price;
              }, 0)
              .toLocaleString({
                language: "es",
                numberingSystem: "$AR",
              })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
