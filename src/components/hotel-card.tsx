import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/star-rating";
import { useNavigate } from "react-router-dom";

interface HotelCard {
  hotel: {
    place_id: string;
    nome_hotel_auxiliar: string;
    municipio_fornecedor_auxiliar: string;
    pais_fornecedor_auxiliar: string;
    Estrelas: string;
    rating: string;
  };
}

export function HotelCard({ hotel }: HotelCard) {

  const navigate = useNavigate();

  function goToHotelDetalhes(place_id: string) {
    navigate(`/hotel/${place_id}`);
  }
  return (
    <Card className="w-full bg-transparent justify-between">
      <CardHeader className="flex flex-row items-start justify-between max-sm:px-4">
        <div className="space-y-1.5">
          <CardTitle>{hotel.nome_hotel_auxiliar}</CardTitle>
          <CardDescription className="grid gap-2">
            <div className="flex gap-2"> <span className="max-w-full text-left ">
              País:
            </span>
              <Badge variant="secondary" className="self-start text-sm">
                {hotel.pais_fornecedor_auxiliar}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <Badge variant="secondary" className="self-start text-sm">
                {hotel.municipio_fornecedor_auxiliar}
              </Badge>
            </div>
            <span className="max-w-full text-left">
              Avaliações:  <Badge variant="secondary" className="self-start text-sm">
                {hotel.rating}
              </Badge>
            </span>


            <span className="max-w-full text-left font-bold">
              Número de estrelas do hotel:
            </span>
            <StarRating rating={parseInt(hotel.Estrelas)} size={25} />

          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="border-t pt-4  max-sm:px-2 max-sm:flex max-sm:justify-center">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer ml-auto max-sm:m-auto"
          onClick={() => goToHotelDetalhes(hotel.place_id)}
        >
          Ver detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
