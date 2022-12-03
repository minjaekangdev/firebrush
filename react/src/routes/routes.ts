import { lazy } from "react";
const Login = lazy(() => import("../components/users/Login"));
const Landing = lazy(() => import("../components/landing/Landing"));
const Register = lazy(() => import("../components/users/Register"));
const Events = lazy(() => import("../components/events/Events"));
const MyEvents = lazy(() => import("../components/events/MyEvents"));
const PageNotFound = lazy(() => import("../components/error/PageNotFound"));
const Map = lazy(() => import("../components/map/Map"));
const EventForm = lazy(() => import("../components/events/EventForm"));

const routes = [
  {
    path: "/",
    name: "Landing",
    element: Landing,
  },
  {
    path: "/login",
    name: "Login",
    element: Login,
  },
  {
    path: "/register",
    name: "Register",
    element: Register,
  },
  {
    path: "/events",
    name: "Events",
    element: Events,
  },
  {
    path: "/map",
    name: "Map",
    element: Map,
  },
  {
    path: "/myevents",
    name: "My Events",
    element: MyEvents,
  },
  {
    path: "/events/new",
    name: "Event Form",
    element: EventForm,
  },
  {
    path: "*",
    name: "Error-404",
    element: PageNotFound,
  },
];

export default routes;
