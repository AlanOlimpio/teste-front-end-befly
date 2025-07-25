import axiosPrivate from "@/lib/axios";

export async function getHotels() {
   const controller = new AbortController();
  const response = await axiosPrivate.get<GetHotelsResponse>("/api/hotels", {
    params: {
      offset:0,
    },
    signal: controller.signal,
  });

  return response.data;
}



