import { ListHotels } from "@/components/list-hotels";

export function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight px-8 max-sm:px-5">Lista de Hotéis</h1>
      <ListHotels />
    </>
  );
}
