import { useContext, useState } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import netEventService from "../../services/eventService";
import { AxiosError, AxiosResponse } from "axios";
import { EventContext } from "../../contexts/EventContext";
import toastr from "toastr";
import { Autocomplete } from "@react-google-maps/api";
import GoogleApiLoad from "../layout/GoogleApiLoad";

function SearchBox() {
  const { setPaginData } = useContext(EventContext);
  const [autoCompleteObj, setAutoCompleteObj] =
    useState<google.maps.places.Autocomplete>();
  const [geoForm, setGeoForm] = useState<FormikValues>({
    address: "",
    lat: "",
    lng: "",
    radius: 5,
  });

  const onAutoCompleteLoad = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    setAutoCompleteObj(autocomplete);
  };

  const onPlaceChanged = (values: FormikValues) => {
    const place = autoCompleteObj?.getPlace();
    const lat = autoCompleteObj?.getPlace().geometry?.location?.lat();
    const lng = autoCompleteObj?.getPlace().geometry?.location?.lng();
    values.address = place?.formatted_address;
    values.lat = lat;
    values.lng = lng;
    setGeoForm(values);
  };

  const onGeoSearchSuccess = (response: AxiosResponse) => {
    toastr.success("Results found.");
    setPaginData(response.data.item);
  };
  const onGeoSearchError = (error: AxiosError) => {
    toastr.error("No results");
    console.log(error);
  };

  const onGeoSearch = (values: FormikValues) => {
    netEventService
      .geosearch(values.lat, values.lng, values.radius)
      .then(onGeoSearchSuccess)
      .catch(onGeoSearchError);
  };

  const onQuerySeachSuccess = (response: AxiosResponse) => {
    setPaginData(response.data.item.pagedItems);
    toastr.success("Results found.");
    console.log(response);
  };

  const onQuerySearchError = (error: AxiosError) => {
    toastr.error("No results found.");
  };

  const onQuerySearch = (values: FormikValues) => {
    netEventService
      .search(0, 100, values.query)
      .then(onQuerySeachSuccess)
      .catch(onQuerySearchError);
  };

  return GoogleApiLoad() ? (
    <div
      className="align-content-center d-table rounded"
      style={{ width: "100%" }}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          query: "",
        }}
        onSubmit={onQuerySearch}
      >
        <Form>
          <div className="row d-flex align-items-baseline m-2">
            <div className="col-xl-1">
              <h5>Search:</h5>
            </div>
            <div className="col-xl-10">
              <Field
                className="form-control"
                type="text"
                name="query"
                placeholder="Filter by query"
              />
            </div>
            <div className="col-xl-1 my-1">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <Formik
        enableReinitialize={true}
        initialValues={geoForm}
        onSubmit={onGeoSearch}
      >
        {({ values }) => (
          <Form>
            <div className="row d-flex align-items-baseline m-2">
              <div className="col-xl-1">
                <h5>Or by:</h5>
              </div>
              <div className="col-xl-8">
                <Autocomplete
                  onLoad={onAutoCompleteLoad}
                  onPlaceChanged={() => onPlaceChanged(values)}
                >
                  <Field
                    className="form-control my-2"
                    type="text"
                    name="address"
                    id="address"
                    value={values.address}
                    placeholder="Your location"
                  />
                </Autocomplete>
              </div>
              <div className="col-xl-2">
                <Field className="form-control" as="select" name="radius">
                  <option value={5}>5 Miles</option>
                  <option value={10}>10 Miles</option>
                  <option value={25}>25 Miles</option>
                  <option value={50}>50 Miles</option>
                  <option value={100}>100 Miles</option>
                </Field>
              </div>
              <div className="col-xl-1 my-1">
                <button type="submit" className="btn btn-primary mb-2">
                  Search
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <></>
  );
}
export default SearchBox;
