type GetHotelsResponse = {
  success: boolean;
  data: {
    place_id: string;
    nome_hotel_auxiliar: string;
    endereco_logradouro_auxiliar: string;
    endereco_bairro_auxiliar: string;
    municipio_fornecedor_auxiliar: string;
    endereco_completo_auxiliar: string;
    pais_fornecedor_auxiliar: string;
    cep_fornecedor_auxiliar: string;
    latitude_fornecedor_auxiliar: string;
    longitude_fornecedor_auxiliar: string;
    cadeia_auxiliar: string;
    rating: string;
    reviews: string;
    in_best_district_booking: string;
    Estrelas: string;
    AddedDate: string;
  }[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}
type StarRating = {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
};

type GetHotelsQuery = {
  offset?: string | null;
  name?: string | null;
  city?: string | null;
  country?: string | null;
  rating?: string | null;

}