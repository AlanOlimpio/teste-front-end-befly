import axiosPrivate from "@/lib/axios";

export async function getHotels({offset, name, city, country, rating}:GetHotelsQuery) {
   const controller = new AbortController();
  const response = await axiosPrivate.get<GetHotelsResponse>("/api/hotels", {
    params: {
      offset: offset || 0, 
      name,
      city,
      country,
      rating
    },
    signal: controller.signal,
  });

  return response.data;
}



