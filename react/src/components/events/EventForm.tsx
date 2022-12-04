import { useContext, useState } from "react";
import { Formik, Form, Field, FormikValues, ErrorMessage } from "formik";
import { Autocomplete } from "@react-google-maps/api";
import logo from "../../assets/images/logo2.png";
import netEventService from "../../services/eventService";
import { AxiosError, AxiosResponse } from "axios";
import toastr from "toastr";
import { UserContext } from "../../contexts/UserContext";
import GoogleApiLoad from "../GoogleApiLoad";
import { EventAddSchema } from "../../schemas/EventAddSchema";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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
    navigate("/myevents");
  };
  const onCreateError = (error: AxiosError) => {
    toastr.error("An error occured..");
  };

  const onSubmit = (values: FormikValues) => {
    console.log(values);
    netEventService.create(values).then(onCreateSuccess).catch(onCreateError);
  };
  return GoogleApiLoad() ? (
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
                  validationSchema={EventAddSchema}
                >
                  {({ values }) => (
                    <Form>
                      <div className="row mt-4">
                        <div className="col-12 mb-3">
                          <label htmlFor="name">
                            Name{" "}
                            <ErrorMessage
                              name="name"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Event Name"
                            aria-label="name"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="headline">
                            Headline{" "}
                            <ErrorMessage
                              name="headline"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="headline"
                            type="text"
                            className="form-control"
                            placeholder="Main Headline"
                            aria-label="headline"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="summary">
                            Short Summary{" "}
                            <ErrorMessage
                              name="summary"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="summary"
                            type="text"
                            className="form-control"
                            placeholder="Short summary"
                            aria-label="summary"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="description">
                            Description{" "}
                            <ErrorMessage
                              name="description"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="description"
                            type="text"
                            className="form-control"
                            placeholder="Full description"
                            aria-label="description"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="slug">
                            Slug{" "}
                            <ErrorMessage
                              name="slug"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="slug"
                            type="text"
                            className="form-control"
                            placeholder="Unique slug"
                            aria-label="slug"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label htmlFor="imageUrl">
                            Image URL{" "}
                            <ErrorMessage
                              name="imageUrl"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="imageUrl"
                            type="url"
                            className="form-control"
                            placeholder="https://.."
                            aria-label="imageUrl"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="dateStart">
                            Start Date & Time{" "}
                            <ErrorMessage
                              name="dateStart"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="dateStart"
                            type="datetime-local"
                            className="form-control"
                            aria-label="dateStart"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="dateEnd">
                            End Date & Time{" "}
                            <ErrorMessage
                              name="dateEnd"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="dateEnd"
                            type="datetime-local"
                            className="form-control"
                            aria-label="dateEnd"
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
                              aria-label="address"
                            />
                          </Autocomplete>
                        </div>
                        <div className="col-md-2 mb-3">
                          <label htmlFor="buildingNumber">
                            Street#{" "}
                            <ErrorMessage
                              name="buildingNumber"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="buildingNumber"
                            type="text"
                            className="form-control"
                            aria-label="buildingNumber"
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label htmlFor="street">
                            Street{" "}
                            <ErrorMessage
                              name="street"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="street"
                            type="text"
                            className="form-control"
                            value={values.street}
                            aria-label="street"
                          />
                        </div>
                        <div className="col-md-2 mb-3">
                          <label htmlFor="city">
                            City{" "}
                            <ErrorMessage
                              name="city"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="city"
                            type="text"
                            className="form-control"
                            value={values.city}
                            aria-label="city"
                          />
                        </div>
                        <div className="col-md-2 mb-3">
                          <label htmlFor="state">
                            State{" "}
                            <ErrorMessage
                              name="state"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="state"
                            type="text"
                            className="form-control"
                            value={values.state}
                            aria-label="state"
                          />
                        </div>
                        <div className="col-md-2 mb-3">
                          <label htmlFor="zipCode">
                            ZipCode{" "}
                            <ErrorMessage
                              name="zipCode"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="zipCode"
                            type="text"
                            className="form-control"
                            value={values.zipCode}
                            aria-label="zipCode"
                          />
                        </div>
                        <div className="col-xl-6 mb-3">
                          <label htmlFor="state">
                            Latitude{" "}
                            <ErrorMessage
                              name="latitude"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="latitude"
                            type="text"
                            className="form-control"
                            value={values.latitude}
                            aria-label="latitude"
                          />
                        </div>
                        <div className="col-xl-6 mb-3">
                          <label htmlFor="state">
                            Longitude{" "}
                            <ErrorMessage
                              name="longitude"
                              component="span"
                              className="text-danger"
                            />
                          </label>
                          <Field
                            name="longitude"
                            type="text"
                            className="form-control"
                            value={values.longitude}
                            aria-label="longitude"
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
  ) : (
    <></>
  );
}

export default EventForm;
