import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "../constants/service";

export const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (res) => res,
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => Promise.reject(error)
);

export const GET = async <T extends object = object>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return instance.get(url, { ...config });
};

export const POST = async <T extends object = object>(
  url: string,
  data: object = {},
  config: AxiosRequestConfig = {}
) => {
  return instance.post<T>(url, data, { ...config });
};

export default instance;
