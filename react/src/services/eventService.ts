import axios, { AxiosError, AxiosResponse } from "axios";
import { FormikValues } from "formik";

let host = process.env.REACT_APP_API_HOST;

class EventService {
  host: string;
  constructor(host: string) {
    this.host = host;
  }

  create = (payload: FormikValues) => {
    const config = {
      method: "POST",
      url: `${this.host}/api/events`,
      data: payload,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  update = (payload: FormikValues) => {
    const config = {
      method: "POST",
      url: `${this.host}/api/events/${payload.id}`,
      data: payload,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  search = (pageIndex: number, pageSize: number, query: string) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/events/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  geosearch = (latitude: number, longitude: number, radius: number) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/events/search/geo?lat=${latitude}&lng=${longitude}&radius=${radius}`,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  getAll = (pageIndex: number, pageSize: number) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/events?pageindex=${pageIndex}&pagesize=${pageSize}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  volunteer = (userId: number, eventId: number) => {
    const config = {
      method: "POST",
      url: `${this.host}/api/events/volunteer?userId=${userId}&eventID=${eventId}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };
  unvolunteer = (userId: number, eventId: number) => {
    const config = {
      method: "DELETE",
      url: `${this.host}/api/events/unvolunteer?userId=${userId}&eventID=${eventId}`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  myEvents = (pageIndex: number, pageSize: number, userId: number) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/events/myevents?pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`,
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

export const netEventService = new EventService(host!);

export default netEventService;
