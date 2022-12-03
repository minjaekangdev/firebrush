import { createContext } from "react";
import { defaultUser } from "../constants/Defaults";
import { User } from "../types/Types";

export const UserContext = createContext({
  currentUser: defaultUser,
  setCurrentUser: (user: User) => {},
});
