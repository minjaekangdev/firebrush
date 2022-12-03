type User = {
  id: number | 0;
  email: string | "";
  firstName: string | "";
  lastName: string | "";
  avatarUrl: string | "";
  dob: string | "";
  isLoggedIn: boolean | false;
};

type aEvent = {
  id: number | 0;
  headline: string | "";
  summary: string | "";
  description: string | "";
  metaData: [
    {
      dateStart: string | "";
      dateEnd: string | "";
      location: [
        {
          buildingNumber: string | "";
          street: string | "";
          city: string | "";
          state: string | "";
          zipCode: string | "";
          latitude: number | 0;
          longitude: number | 0;
        }
      ];
    }
  ];
  slug: string | "";
  imageUrl: string | "";
  createdBy: number | 0;
  dateCreated: string | "";
  dateModified: string | "";
};

type EventAddRequest = {
  headline: string | "";
  summary: string | "";
  description: string | "";
  dateStart: string | "";
  dateEnd: string | "";
  buildingNumber: string | "";
  street: string | "";
  city: string | "";
  state: string | "";
  zipCode: string | "";
  latitude: number | 0;
  longitude: number | 0;
  slug: string | "";
  imageUrl: string | "";
  dateCreated: string | "";
  dateModified: string | "";
};

type Coord = {
  lat: number;
  lng: number;
  label: string;
};

export type { User, aEvent, EventAddRequest, Coord };
