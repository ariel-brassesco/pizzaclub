import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type Data = Record<string, any>;

const mapData = (result: AxiosResponse<any>) => result.data;

export class Http {
  public constructor() {
    axios.defaults.baseURL = "/api";
  }

  public setAuth(token: string) {
    axios.defaults.headers.common["authorization"] = `JWT ${token}`;
  }

  public get(path: string, options: AxiosRequestConfig = {}) {
    return axios.get(path, options).then(mapData);
  }

  public post(path: string, data: Data, options: AxiosRequestConfig = {}) {
    return axios.post(path, data, options).then(mapData);
  }

  public put(path: string, data: Data, options: AxiosRequestConfig = {}) {
    return axios.put(path, data, options).then(mapData);
  }

  public delete(path: string, options: AxiosRequestConfig = {}) {
    return axios.delete(path, options).then(mapData);
  }
}

export const http = new Http();

export const apiRoutes = {
  login: "/api-token-auth/",
  me: "/accounts/me",
  order_whatsapp: "/orders/whatsapp/",
  owner_data: "/orders/owner/",
  types_data: "/orders/types/",
  products_data: "/orders/products/",
};
