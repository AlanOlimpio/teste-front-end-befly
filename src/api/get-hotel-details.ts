import axiosPrivate from "@/lib/axios";

export async function getHotelDetails(  place_id : string) {
  const response = await axiosPrivate.get<GetHotelDetailResponse>(`/api/hotels/${place_id}`);

  return response.data;
}