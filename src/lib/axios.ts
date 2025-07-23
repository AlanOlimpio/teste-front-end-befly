import axios from "axios";

import { env } from "@/env";
import { accessTokenTeste } from "@/context/auth-provider";
export const api = axios.create({
  baseURL: env.VITE_API_URL,
});

 const axiosPrivate = axios.create({
  baseURL: env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  
 });

 axiosPrivate.interceptors.request.use(async (config) => {
  const token =  await localStorage.getItem(accessTokenTeste)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const setupInterceptors = (onLogout: () => void) => {
  axiosPrivate.interceptors.response.use(
    res => res,
    err => {
      const status = err.response?.status
      if (status === 401 || status === 403) {
        onLogout()
      }
      return Promise.reject(err)
    }
  )
}

export default axiosPrivate
