import { aEvent, User } from "../types/Types";
import { LoadScriptProps } from "@react-google-maps/api";

const defaultUser: User = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  avatarUrl: "",
  dob: "",
  isLoggedIn: false,
};

const defaultEvent: aEvent = {
  id: 0,
  headline: "",
  summary: "",
  description: "",
  metaData: [
    {
      dateStart: "",
      dateEnd: "",
      location: [
        {
          buildingNumber: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          latitude: 0,
          longitude: 0,
        },
      ],
    },
  ],
  slug: "",
  imageUrl: "",
  createdBy: 0,
  dateCreated: "",
  dateModified: "",
};

const defaultMapLibrary: LoadScriptProps["libraries"] = ["places"];

export { defaultUser, defaultEvent, defaultMapLibrary };
