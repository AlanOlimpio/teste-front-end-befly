import axiosPrivate from "@/lib/axios";

export async function getHotels({offset}:GetHotelsQuery) {
   const controller = new AbortController();
  const response = await axiosPrivate.get<GetHotelsResponse>("/api/hotels", {
    params: {
      offset: offset || 0,
    },
    signal: controller.signal,
  });

  return response.data;
}



