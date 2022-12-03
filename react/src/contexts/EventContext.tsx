import { createContext } from "react";
import { defaultEvent } from "../constants/Defaults";

export const EventContext = createContext({
  events: [defaultEvent],
  myEvents: [defaultEvent],
  paginData: [defaultEvent],
  mainEvent: defaultEvent,
  setMyEvents: (arr: any) => {},
  setPaginData: (arr: any) => {},
  setMainEvent: (event: any) => {},
});
