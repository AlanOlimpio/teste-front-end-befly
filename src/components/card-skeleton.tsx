import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
export function CardSkeleton() {
    return (
        <>
            {
                Array.from({ length: 10 }).map((_, i) => {
                    return (
                        <Card key={i} className="w-full bg-transparent justify-between">
                            <CardHeader className="flex flex-row items-start justify-between max-sm:px-4">
                                <div className="space-y-1.5">
                                    <CardTitle>  <Skeleton className="h-6 w-[calc(60%-1.5rem)]" /></CardTitle>
                                    <CardDescription className="grid gap-2">
                                        <div className="flex gap-2"> <span className="max-w-full text-left ">
                                            País:
                                        </span>
                                            <Skeleton className="h-6 w-[calc(60%-1.5rem)]" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <Skeleton className="h-6 w-[calc(60%-1.5rem)]" />
                                        </div>
                                        <span className="max-w-full text-left flex items-center gap-2">
                                            Avaliações: <Skeleton className="h-6 w-[36px]" />
                                        </span>


                                        <span className="max-w-full text-left font-bold">
                                            Número de estrelas do hotel:
                                        </span>
                                        <Skeleton className="h-6 w-[150px]" />

                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="border-t pt-4  max-sm:px-2 max-sm:flex max-sm:justify-center">
                                <Skeleton className="h-8 w-[110px]" />
                            </CardContent>
                        </Card>

                    );
                })
            }
        </>
    );
}


