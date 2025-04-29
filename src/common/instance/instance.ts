import axios from "axios"
import {AUTH_TOKEN} from "@/common/constant";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Api-Key": import.meta.env.VITE_API_KEY,
  },
})

instance.interceptors.request.use( ((config) =>{
  config.headers['Authorization'] = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
  return config;
}))

      
