import { api } from "@/lib/axios";
export interface SignInBody {
    username: string;
    password?: string;
}
export async function signIn({ username, password }: SignInBody) {
  const res = await api.post("/api/login", { username, password });
  return res;
}