import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type PaginationControlsProps = {
  pageNo: number;
  totalRecords: number;
  limit: number;
  filteredCount: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void; // ✅ make it optional
};

export const PaginationControls = ({
  pageNo,
  totalRecords,
  limit,
  filteredCount,
  onPageChange,
  onLimitChange
}: PaginationControlsProps) => {
  const totalPages = Math.ceil(totalRecords / limit);

  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex items-center gap-4">
        {onLimitChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <Select
              onValueChange={(val) => onLimitChange(Number(val))}
              value={String(limit)}
            >
              <SelectTrigger className="w-[72px] h-8 bg-white border text-sm">
                <SelectValue placeholder={`${limit}`} />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div className="space-x-2 flex items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageNo - 1)}
          disabled={pageNo === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {pageNo} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageNo + 1)}
          disabled={pageNo >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
