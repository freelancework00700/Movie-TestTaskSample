import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const API_BASE_URL = process?.env?.NEXT_PUBLIC_API_KEY;
console.log("API_BASE_URL", API_BASE_URL)

type Method = "get" | "post" | "put" | "delete";


const http = axios.create({
    baseURL: API_BASE_URL,
})

http.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] =
            "Bearer " + localStorage.getItem("token");
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export async function services<D, T>(
    url: string,
    method: Method,
    data?: D
): Promise<T> {
    try {
        const config: AxiosRequestConfig<D> = { url, method, data };
        const response: AxiosResponse<T> = await http.request<T>(config);
        return response.data;
    } catch (error: any) {
        console.log("error", error);
        throw error.response ? error.response?.data?.message : error.message;
    }
}