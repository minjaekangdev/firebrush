import { useContext, useState } from "react";
import { Formik, Form, Field, FormikValues } from "formik";
import { Autocomplete } from "@react-google-maps/api";
import logo from "../../assets/images/logo2.png";
import netEventService from "../../services/eventService";
import { AxiosError, AxiosResponse } from "axios";
import toastr from "toastr";
import { UserContext } from "../../contexts/UserContext";
import GoogleApiLoad from "../layout/GoogleApiLoad";

function EventForm() {
  const { currentUser } = useContext(UserContext);
  const [autoCompleteObj, setAutoCompleteObj] =
    useState<google.maps.places.Autocomplete>();
  const [formData, setFormData] = useState<FormikValues>({
    name: "",
    headline: "",
    summary: "",
    description: "",
    slug: "",
    statusId: "",
    dateStart: "",
    dateEnd: "",
    latitude: 0,
    longitude: 0,
    buildingNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    imageUrl: "",
    address: "",
    createdBy: currentUser.id,
  });

  const onAutoCompleteLoad = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    setAutoCompleteObj(autocomplete);
  };

  const onPlaceChanged = (values: FormikValues) => {
    const lat = autoCompleteObj?.getPlace().geometry?.location?.lat();
    const lng = autoCompleteObj?.getPlace().geometry?.location?.lng();
    const place = autoCompleteObj?.getPlace();

    values.address = place?.formatted_address;

    values.latitude = lat!;
    values.longitude = lng!;
    for (const component of place?.address_components as google.maps.GeocoderAddressComponent[]) {
      const componentType = component.types[0];
      switch (componentType) {
        case "street_number": {
          values.buildingNumber = component.long_name;
          formData.buildingNumber = component.long_name;
          break;
        }
        case "route": {
          values.street = component.short_name;
          break;
        }
        case "postal_code": {
          values.zipCode = component.long_name;
          break;
        }
        case "locality":
          values.city = component.long_name;
          break;
        case "administrative_area_level_1": {
          values.state = component.short_name;
          break;
        }
      }
    }
    setFormData(values);
  };

  const onCreateSuccess = (response: AxiosResponse) => {
    toastr.success("Successfully created your event!");
  };
  const onCreateError = (error: AxiosError) => {
    toastr.error("An error occured..");
  };

  const onSubmit = (values: FormikValues) => {
    console.log(values);
    netEventService.create(values).then(onCreateSuccess).catch(onCreateError);
  };
  return GoogleApiLoad() ? (
    <div className="landing-bg">
      <div className="container border-1 rounded">
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-5">
                <div className="mb-4">
                  <img src={logo} alt="logo" className="img-fluid" />
                  <h1 className="text-center">Create an event!</h1>
                  <Formik
                    enableReinitialize={true}
                    initialValues={formData}
                    onSubmit={onSubmit}
                  >
                    {({ values, validateField }) => (
                      <Form>
                        <div className="row mt-4">
                          <div className="col-12 mb-3">
                            <label htmlFor="name">Name</label>
                            <Field
                              name="name"
                              type="text"
                              className="form-control"
                              placeholder="Event Name"
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="headline">Headline</label>
                            <Field
                              name="headline"
                              type="text"
                              className="form-control"
                              placeholder="Main Headline"
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="summary">Short Summary</label>
                            <Field
                              name="summary"
                              type="text"
                              className="form-control"
                              placeholder="Short summary"
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="description">Description</label>
                            <Field
                              name="description"
                              type="text"
                              className="form-control"
                              placeholder="Full description"
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="slug">Slug</label>
                            <Field
                              name="slug"
                              type="text"
                              className="form-control"
                              placeholder="Unique slug"
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label htmlFor="dateStart">Image URL</label>
                            <Field
                              name="imageUrl"
                              type="url"
                              className="form-control"
                              placeholder="https://.."
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="dateStart">Start Date & Time</label>
                            <Field
                              name="dateStart"
                              type="datetime-local"
                              className="form-control"
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="dateStart">End Date & Time</label>
                            <Field
                              name="dateEnd"
                              type="datetime-local"
                              className="form-control"
                            />
                          </div>

                          <div className="col-12 mb-3">
                            <label htmlFor="buildingNumber">Address</label>
                            <Autocomplete
                              onLoad={onAutoCompleteLoad}
                              onPlaceChanged={() => onPlaceChanged(values)}
                            >
                              <Field
                                name="address"
                                type="text"
                                className="form-control"
                                autocomplete="on"
                              />
                            </Autocomplete>
                          </div>
                          <div className="col-md-2 mb-3">
                            <label htmlFor="buildingNumber">Street#</label>
                            <Field
                              name="buildingNumber"
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label htmlFor="street">Street</label>
                            <Field
                              name="street"
                              type="text"
                              className="form-control"
                              value={values.street}
                            />
                          </div>
                          <div className="col-md-2 mb-3">
                            <label htmlFor="city">City</label>
                            <Field
                              name="city"
                              type="text"
                              className="form-control"
                              value={values.city}
                            />
                          </div>
                          <div className="col-md-2 mb-3">
                            <label htmlFor="state">State</label>
                            <Field
                              name="state"
                              type="text"
                              className="form-control"
                              value={values.state}
                            />
                          </div>
                          <div className="col-md-2 mb-3">
                            <label htmlFor="zipCode">ZipCode</label>
                            <Field
                              name="zipCode"
                              type="text"
                              className="form-control"
                              value={values.zipCode}
                            />
                          </div>
                          <div className="col-xl-6 mb-3">
                            <label htmlFor="state">Latitude</label>
                            <Field
                              name="latitude"
                              type="text"
                              className="form-control"
                              value={values.latitude}
                            />
                          </div>
                          <div className="col-xl-6 mb-3">
                            <label htmlFor="state">Longitude</label>
                            <Field
                              name="longitude"
                              type="text"
                              className="form-control"
                              value={values.longitude}
                            />
                          </div>

                          <div className="col-12 mt-3">
                            <button className="btn btn-primary" type="submit">
                              Create Event
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default EventForm;
