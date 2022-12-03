import { useJsApiLoader } from "@react-google-maps/api";
import { defaultMapLibrary } from "../constants/Defaults";

let key = process.env.REACT_APP_GOOGLE_API_KEY;

function GoogleApiLoad() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key!,
    libraries: defaultMapLibrary,
  });
  return isLoaded;
}

export default GoogleApiLoad;
