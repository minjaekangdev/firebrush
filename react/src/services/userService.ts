import axios, { AxiosError, AxiosResponse } from "axios";
import { FormikValues } from "formik";

let host = process.env.REACT_APP_API_HOST;

class UserService {
  host: string;
  constructor(host: string) {
    this.host = host;
  }

  getAll = (pageIndex: number, pageSize: number) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/users?PageIndex=${pageIndex}&PageSize=${pageSize}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  getById = (id: number) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/users/${id}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  create = (payload: FormikValues) => {
    const config = {
      method: "POST",
      url: `${this.host}/api/users`,
      data: payload,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  login = (payload: FormikValues) => {
    const config = {
      method: "POST",
      url: `${this.host}/api/users/login`,
      data: payload,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  logout = () => {
    const config = {
      method: "GET",
      url: `${this.host}/api/users/logout`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  current = () => {
    const config = {
      method: "GET",
      url: `${this.host}/api/users/current`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  handleSuccess = (res: AxiosResponse) => {
    return res;
  };

  handleError = (error: AxiosError) => {
    return Promise.reject(error);
  };
}

export const netUserService = new UserService(host!);

export default netUserService;
