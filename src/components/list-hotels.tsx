import { Input } from "@/components/ui/input";

import { Pagination } from "@/components/pagination";
import { HotelCard } from "./hotel-card";
import { getHotels } from "@/api/get-hotels";
import { useQuery } from "@tanstack/react-query";

export function ListHotels() {

    const { data: result } = useQuery({
        queryKey: ["ListHotels"],
        queryFn: getHotels,
    });

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
            <Pagination pageIndex={0} totalCount={105} perPage={10} /></>
    );
}