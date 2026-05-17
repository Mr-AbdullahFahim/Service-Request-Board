import { Filter } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CategoryFilter } from "./CategoryFilter";
import { StatusFilter } from "./StatusFilter";
import { Label } from "@/components/ui/label";


export function JobFilters() {
  return (
    <Popover>
      <PopoverTrigger className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto" })}>
        <Filter className="mr-2 h-4 w-4" />
        Filters
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Set the filters to find specific service requests.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category-filter">Category</Label>
              <div id="category-filter">
                <CategoryFilter />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status-filter">Status</Label>
              <div id="status-filter">
                <StatusFilter />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
