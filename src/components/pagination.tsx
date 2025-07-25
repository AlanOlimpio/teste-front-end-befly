import {
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export interface PaginationProps {
    pageIndex: number;
    totalCount: number;
    perPage: number;
    onPageChange: (pageIndex: number) => Promise<void> | void;
}
export function Pagination({
    pageIndex,
    perPage,
    totalCount,
    onPageChange,
}: PaginationProps) {
    const pages = Math.ceil(totalCount / perPage) || 1;
    return (
        <div className="flex flex-wrap items-center justify-between gap-6 max-sm:gap-2 max-md:items-start sticky bg-white dark:bg-background bottom-0 p-4 max-sm:2 border">
            <span className="text-sm text-muted-foreground max-sm:hidden">
                Total de {totalCount} item(s)
            </span>
            <div className="flex flex-wrap items-center gap-6 lg:gap-8">
                <div className="text-sm font-medium">
                    Página {pageIndex + 1} de {pages}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        onClick={() => onPageChange(0)}
                        variant="outline"
                        className="h-8 w-8 p-0 cursor-pointer"
                        disabled={pageIndex === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Primeira página</span>
                    </Button>
                    <Button
                        onClick={() => onPageChange(pageIndex - 1)}
                        variant="outline"
                        className="h-8 w-8 p-0 cursor-pointer"
                        disabled={pageIndex === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Página anterior</span>
                    </Button>
                    <Button
                        onClick={() => onPageChange(pageIndex + 1)}
                        variant="outline"
                        className="h-8 w-8 p-0 cursor-pointer"
                        disabled={pages <= pageIndex + 1}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Próxima página</span>
                    </Button>
                    <Button
                        onClick={() => onPageChange(pages - 1)}
                        variant="outline"
                        className="h-8 w-8 p-0 cursor-pointer"
                        disabled={pages <= pageIndex + 1}
                    >
                        <ChevronsRight className="h-4 w-4" />
                        <span className="sr-only">Última página</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}