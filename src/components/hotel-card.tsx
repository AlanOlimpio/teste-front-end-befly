import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { MapPin } from "lucide-react";
import { Badge } from "./ui/badge";

export function HotelCard() {

  return (
    <Card className="w-full max-w-lg bg-transparent">
      <CardHeader className="flex flex-row items-start justify-between max-sm:px-4">
        <div className="space-y-1.5">
          <CardTitle>Hotel Niles Istanbul</CardTitle>
          <CardDescription className="grid gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> <span className="min-md:truncate w-32 max-w-full text-left">Ordu Caddesi Dibekli Cami Sokak No:19 Beyazit </span>
            </div>
            <Badge variant="secondary" className="self-start">
              Turquia
            </Badge>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="border-t pt-4  max-sm:px-2 max-sm:flex max-sm:justify-center">
        <Button variant="outline" size="sm" className="cursor-pointer ml-auto max-sm:m-auto">
          Ver detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
