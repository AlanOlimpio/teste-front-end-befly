import { Input } from "@/components/ui/input";

import { Pagination } from "@/components/pagination";
import { HotelCard } from "./hotel-card";
import { getHotels } from "@/api/get-hotels";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export function ListHotels() {
    const [searchParams, setSearchParams] = useSearchParams();

    const pageIndex = z.coerce
        .number()
        .transform((page) => page - 1)
        .parse(searchParams.get("page") ?? "1");


    const { data: result } = useQuery({
        queryKey: ["ListHotels", pageIndex],
        queryFn: () => getHotels({
            offset: pageIndex.toString()
        }),
    });


    function handlePaginate(pageIndex: number) {
        setSearchParams((state) => {
            state.set("page", (pageIndex + 1).toString());
            return state;
        });
    }
    return (
        <>
            <div className="px-8 max-sm:px-5">
                <div className="flex flex-col gap-4 pb-9">
                    <form className="flex items-center gap-2">
                        <Input placeholder="Pesquisar" className="h-8 w-full max-w-[320px]" />
                    </form>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max gap-4 lg:gap-5 flex-1">
                        {result &&
                            result.data.map((hotel) => {
                                return <HotelCard key={hotel.place_id} hotel={hotel} />;
                            })}
                    </div>
                </div>

            </div>
            {result && (<Pagination onPageChange={handlePaginate} pageIndex={result.pagination.offset} totalCount={result.pagination.total} perPage={result.pagination.limit} />)}
        </>
    );
}