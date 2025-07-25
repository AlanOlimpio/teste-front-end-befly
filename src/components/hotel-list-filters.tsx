import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const listHotelsFiltersSchema = z.object({
    name: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    rating: z.string().optional(),
});

type HotelsFiltersSchema = z.infer<typeof listHotelsFiltersSchema>;

export function HotelsListFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get("name");
    const city = searchParams.get("city");
    const country = searchParams.get("country");
    const rating = searchParams.get("rating");

    const { register, handleSubmit, reset } =
        useForm<HotelsFiltersSchema>({
            resolver: zodResolver(listHotelsFiltersSchema),
            defaultValues: {
                name: name ?? "",
                city: city ?? "",
                country: country ?? "",
                rating: rating ?? "",
            },
        });

    function handleFilter({ name, city, country, rating }: HotelsFiltersSchema) {
        setSearchParams((state) => {
            if (name) {
                state.set("name", name);
            } else {
                state.delete("name");
            }
            if (city) {
                state.set("city", city);
            } else {
                state.delete("city");
            }
            if (country) {
                state.set("country", country);
            } else {
                state.delete("country");
            }
            if (rating) {
                state.set("rating", rating);
            } else {
                state.delete("rating");
            }
            state.set("page", "1");

            return state;
        });
    }

    function handleClearFilters() {
        setSearchParams((state) => {
            state.delete("name");
            state.delete("city");
            state.delete("country");
            state.delete("rating");
            state.set("page", "1");
            return state;
        });
        reset({
            name: "",
            city: "",
            country: "",
            rating: "",
        });
    }

    return (
        <form
            onSubmit={handleSubmit(handleFilter)}
            className="flex flex-wrap items-center gap-2 my-4"
        >
            <span className="text-sm font-semibold">Filtros:</span>
            <Input
                placeholder="Nome"
                className="h-8 w-auto grow"
                {...register("name")}
            />
            <Input
                placeholder="Cidade"
                className="h-8 w-auto grow"
                {...register("city")}
            />
            <Input
                placeholder="País"
                className="h-8 w-auto grow"
                {...register("country")}
            />
            <Input
                placeholder="Avaliação"
                className="h-8 w-auto grow"
                {...register("rating")}
            />
            <Button variant="secondary" size="sm" type="submit" className="grow cursor-pointer">
                <Search className="mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>
            <Button
                onClick={handleClearFilters}
                variant="secondary"
                size="sm"
                type="button"
                className="grow cursor-pointer"
            >
                <X className="mr-2 h-4 w-4" />
                Remover filtros
            </Button>
        </form>
    );
}