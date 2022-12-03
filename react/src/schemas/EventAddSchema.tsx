import * as Yup from "yup";

export const EventAddSchema = Yup.object().shape({
  name: Yup.string().min(1).max(50, "Max 50 characters").required("Required"),
  headline: Yup.string()
    .min(1)
    .max(50, "Max 50 characters")
    .required("Required"),
  summary: Yup.string()
    .min(1)
    .max(128, "Max 128 characters")
    .required("Required"),
  description: Yup.string()
    .min(1)
    .max(1000, "Max 1000 characters")
    .required("Required"),
  slug: Yup.string().min(1).max(50, "Max 50 characters").required("Required"),
  imageUrl: Yup.string()
    .min(1)
    .max(255, "Max 255 characters")
    .required("Required"),
  buildingNumber: Yup.string()
    .min(1)
    .max(50, "Max 50 characters")
    .required("Required"),
  street: Yup.string()
    .min(1)
    .max(128, "Max 128 characters")
    .required("Required"),
  city: Yup.string().min(1).max(50, "Max 50 characeters").required("Required"),
  state: Yup.string().min(1).max(50, "Max 50 characters").required("Required"),
  zipCode: Yup.string()
    .min(1)
    .max(50, "Max 50 characters")
    .required("Required"),
  dateStart: Yup.string().required("Required"),
  dateEnd: Yup.string().required("Required"),
  latitude: Yup.number()
    .min(-90, "Must be between -90 and 90")
    .max(90, "Must be between -90 and 90")
    .required("Required"),
  longitude: Yup.number()
    .min(-180, "Must be between -180 and 180")
    .max(180, "Must be between -90 and 90")
    .required("Required"),
});
