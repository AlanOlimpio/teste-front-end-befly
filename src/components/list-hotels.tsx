import { Pagination } from "@/components/pagination";
import { HotelCard } from "./hotel-card";
import { getHotels } from "@/api/get-hotels";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { HotelsListFilters } from "@/components/hotel-list-filters";
import { CardSkeleton } from "./card-skeleton";


export function ListHotels() {
    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get("name");
    const city = searchParams.get("city");
    const country = searchParams.get("country");
    const rating = searchParams.get("rating");

    const pageIndex = z.coerce
        .number()
        .transform((page) => page - 1)
        .parse(searchParams.get("page") ?? "1");


    const { data: result, isLoading: isLoadingResult } = useQuery({
        queryKey: ["ListHotels", pageIndex, name, city, country, rating],
        queryFn: () => getHotels({
            offset: pageIndex.toString(),
            name,
            city,
            country,
            rating
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
                    <HotelsListFilters />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max gap-4 lg:gap-5 flex-1">
                        {result &&
                            result.data.map((hotel) => {
                                return <HotelCard key={hotel.place_id} hotel={hotel} />;
                            })}
                        {isLoadingResult && <CardSkeleton />}
                    </div>
                </div>

            </div>
            {result && result.data.length > 0 && (<Pagination onPageChange={handlePaginate} pageIndex={result.pagination.offset} totalCount={result.pagination.total} perPage={result.pagination.limit} />)}
        </>
    );
}