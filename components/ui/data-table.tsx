
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';

import { Table as UiTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from './input';
import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area';
import { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from './dropdown-menu';
// import Image from 'next/image';
// import notFoundImage from '@/public/assets/notFound.gif';

interface FilterOption {
  label: string;
  key: string;
  subOptions: string[];
  filteredOptions?: string[];
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  onSearch?: (value: string) => void;
  filters?: FilterOption[];
  rowNo?: number; // Row number to highlight
  meta?: {
    updateData: (rowIndex: number, columnId: string, value: any) => void;
    updateColumnData: (columnId: string, value: any) => void;
  };
  onFilterChange?: (filterCategory: string | string[], filterValue?: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onSearch,
  filters,
  meta,
  rowNo,
  onFilterChange,
}: DataTableProps<TData, TValue>) {
  const [filterInput, setFilterInput] = useState('');
  const [updatedFilters, setUpdatedFilters] = useState(filters || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filterInput,
    },
    onGlobalFilterChange: setFilterInput,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    meta,
  });

  const [searcterm, setSearchterm]:any = useState();
  const handleCitySearchChange = (searchTerm: string, filterLabel: string) => {
    setSearchterm(searchTerm); // Make sure this is correctly tied to `value`
    
    setUpdatedFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.label === filterLabel
          ? {
              ...filter,
              filteredOptions: filter.subOptions.filter((option) =>
                option.toLowerCase().includes(searchTerm.toLowerCase())
              ),
            }
          : filter
      )
    );
    // if (searchRef.current) {
    //   searchRef.current.focus();
    // }
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [updatedFilters]);

  const handleClearFilters = () => {
    setFilterInput('');
    table.setGlobalFilter('');
    if (onSearch) {
      onSearch('');
    }

    if (onFilterChange) {
      const filterKeys = filters?.map((filter) => filter.label) || []; // Extract all filter keys
      onFilterChange(filterKeys, ''); // Clear all filters at once
    }
  };
  // console.log(table.getHeaderGroups()[0].headers.length);

  return (
    <>
      <div className="flex justify-end gap-2">
        {/* <Input
          ref={inputRef}
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder={`Search by ${(searchKey || 'defaultSearchKey').charAt(0).toUpperCase() + (searchKey || 'defaultSearchKey').slice(1)}`}
          className="mb-4 max-w-64"
        /> */}

{filters &&(<>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-xs md:text-sm ms-4">
              Filter <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50">
            {updatedFilters.map((filter) => (
              <DropdownMenuSub key={filter.label}>
                <DropdownMenuSubTrigger>
                  {filter.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-48">
                  {filter.label === 'City' ? (
                    <div className="p-2">
                      <Input
                      ref={searchRef}
                      value={searcterm}
                        onChange={(e) => handleCitySearchChange(e.target.value, filter.label)}
                        placeholder="Search city..."
                        className="w-full px-2 py-1 mb-2 border border-gray-300 rounded"
                      />
                      <div className="max-h-40 overflow-y-scroll overflow-x-hidden border border-gray-200 rounded">
                        {(filter.filteredOptions || filter.subOptions).map((subOption) => (
                          <DropdownMenuItem
                            key={subOption}
                            onClick={() => {
                              if (onFilterChange) onFilterChange(filter.label, subOption);
                            }}
                          >
                            {subOption}
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  ) : (
                    filter.subOptions.map((subOption) => (
                      <DropdownMenuItem
                        key={subOption}
                        onClick={() => {
                          if (onFilterChange) onFilterChange(filter.label, subOption);
                        }}
                      >
                        {subOption}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <Button onClick={handleClearFilters} className="text-xs md:text-sm">
          Clear All
        </Button> */}
        </>)}
      </div>

      {table.getRowModel().rows.length ? (
        <ScrollArea className="rounded-md  max-h-full ">
          <UiTable className="relative">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} highlightedRow={rowNo}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className=' py-4'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className=' '>
              {table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  rowNumber={index}
                  highlightedRow={rowNo}
                  data-state={row.getIsSelected() && 'selected'}
                  className='bg-[#FAF6EF] '
                >
                  {row.getVisibleCells().map((cell,index) => (
                    <TableCell key={cell.id} className={`py-4 ${index===0 ?'rounded-tl-xl rounded-bl-xl':''} ${index===(table.getHeaderGroups()[0].headers.length-1)?'rounded-tr-xl rounded-br-xl':''} `} >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </UiTable>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center h-[55vh]">
          {/* <Image src={notFoundImage} alt="No Data Found" height={400} /> */}
          <span className="text-4xl font-bold italic font-serif text-[#F7851E]">
            oops ! data not found
          </span>
        </div>
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </>
  );
}
