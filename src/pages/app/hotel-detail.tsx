import { getHotelDetails } from '@/api/get-hotel-details';
import { StarRating } from '@/components/star-rating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dateFormatter } from '@/utils/formatter';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import { useNavigate, useParams } from 'react-router-dom';

export function HotelDetail() {
    const { place_id } = useParams();
    const navigate = useNavigate();

    const { data: hotel } = useQuery({
        queryKey: ["HotelDetail", place_id],
        queryFn: () => getHotelDetails(place_id!),
    });

    if (!hotel?.data) {
        return;
    }

    return (
        <>
            <div className='flex gap-4 flex-wrap justify-between items-center px-8 max-sm:px-5'>
                <h1 className="text-2xl font-bold tracking-tight ">Detalhes do Hotel</h1>
                <Button variant="secondary" size="sm" type="submit" className="cursor-pointer" onClick={() => navigate(-1)}>
                    <ArrowLeft />
                    Voltar
                </Button>
            </div>
            <div className="flex flex-1 flex-col gap-4  pt-0 px-8 max-sm:px-5">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="grid gap-4" >
                        <div className='flex gap-4 flex-wrap items-center'>
                            <h2 className="text-1xl x tracking-tight">
                                <strong>Nome do Hotel:</strong>
                            </h2>
                            <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel?.data?.nome_hotel_auxiliar}</Badge>
                        </div>
                        {hotel.data.Estrelas && (
                            <div className='flex gap-4 flex-wrap'>
                                <strong className="max-w-full">
                                    Número de estrelas do hotel:
                                </strong>
                                <StarRating rating={parseInt(hotel.data.Estrelas)} size={25} />
                            </div>
                        )}
                        {hotel.data.pais_fornecedor_auxiliar && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>País:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.pais_fornecedor_auxiliar}</Badge>
                            </div>
                        )}
                        {hotel.data.municipio_fornecedor_auxiliar && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Cidade:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.municipio_fornecedor_auxiliar}</Badge>
                            </div>
                        )}
                        {hotel.data.endereco_bairro_auxiliar && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Bairro</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.endereco_bairro_auxiliar}</Badge>
                            </div>
                        )}
                        {hotel.data.endereco_logradouro_auxiliar && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Rua:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.endereco_logradouro_auxiliar}</Badge>
                            </div>
                        )}
                        {hotel.data.endereco_completo_auxiliar && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Endereço completo:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.endereco_completo_auxiliar}</Badge>
                            </div>
                        )}
                        {hotel.data.cep_fornecedor_auxiliar && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>CEP:</strong></p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.cep_fornecedor_auxiliar}</Badge>
                            </div>
                        )}
                        {hotel.data.rating && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Avaliação geral:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">({hotel.data.rating}/10)</Badge>
                            </div>
                        )}
                        {hotel.data.reviews && (<div className='flex gap-4 flex-wrap items-center'>
                            <p><strong>Número de avaliações:</strong> </p>
                            <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.reviews}</Badge>
                        </div>)}
                        {hotel.data.cadeia_auxiliar && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Cadeia hoteleira:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.cadeia_auxiliar}</Badge>
                            </div>
                        )}


                    </div>
                    <div className="flex flex-col gap-4">
                        {hotel.data.AddedDate && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Data de adição ao sistema:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{dateFormatter.format(new Date(hotel.data.AddedDate))}</Badge>
                            </div>
                        )}
                        {hotel.data.in_best_district_booking && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Se está no melhor distrito:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">({hotel.data.in_best_district_booking}/1)</Badge>
                            </div>
                        )}
                        {hotel.data.pointOfInterests && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Pontos de interesse:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.pointOfInterests.substring(0, 100)}</Badge>
                            </div>
                        )}
                        {hotel.data.pointOfInterests && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Pontos de interesse:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.pointOfInterests.substring(0, 100)}</Badge>
                            </div>
                        )}
                        {hotel.data.rating_conforto && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Pontos de interesse:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.rating_conforto}</Badge>
                            </div>
                        )}
                        {hotel.data.rating_limpeza && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Rating de limpeza:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.rating_limpeza}</Badge>
                            </div>
                        )}
                        {hotel.data.cnpj && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>CNPJ:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.cnpj}</Badge>
                            </div>
                        )}
                        {hotel.data.Website && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Website:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal"><a href={hotel.data.Website} target='_blank'>{hotel.data.Website}</a></Badge>
                            </div>
                        )}
                        {hotel.data.telefone_fornecedor_auxiliar && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>Telefone:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal">{hotel.data.telefone_fornecedor_auxiliar}</Badge>
                            </div>
                        )}
                        {hotel.data.bookingUrl && (
                            <div className='flex gap-4 flex-wrap items-center'>
                                <p><strong>URL pública:</strong> </p>
                                <Badge variant="secondary" className="self-start text-sm whitespace-normal"><a href={hotel.data.bookingUrl} target='_blank'>{hotel.data.bookingUrl}</a></Badge>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}