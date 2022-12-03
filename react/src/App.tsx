import React, { Suspense, useState, useEffect } from "react";
import NavbarLanding from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import netUserService from "./services/userService";
import "./App.css";
import { AxiosError, AxiosResponse } from "axios";
import allRoutes from "./routes/routes";
import Footer from "./components/layout/Footer";
import "bootstrap/dist/js/bootstrap.bundle";
import { UserContext } from "./contexts/UserContext";
import { aEvent, User } from "./types/Types";
import netEventService from "./services/eventService";
import { defaultEvent, defaultUser } from "./constants/Defaults";
import { EventContext } from "./contexts/EventContext";
import toastr from "toastr";

const Loading = () => <div className="">loading....</div>;
function App() {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [events, setEvents] = useState<aEvent[]>([]);
  const [paginData, setPaginData] = useState<aEvent[]>([]);
  const [mainEvent, setMainEvent] = useState<aEvent>(defaultEvent);
  const [myEvents, setMyEvents] = useState<aEvent[]>([]);

  const onGetCurrentSuccess = (response: AxiosResponse) => {
    const userId = response.data.item.id;
    netUserService
      .getById(userId)
      .then(onGetByIdSuccess)
      .catch(onGetCurrentError);
  };

  const onMyEventsSuccess = (response: AxiosResponse) => {
    setMyEvents(response.data.item.pagedItems);
  };
  const onMyEventsError = (error: AxiosError) => {
    console.log(error);
  };

  const onGetByIdSuccess = (response: AxiosResponse) => {
    setCurrentUser((prevState) => {
      const pd = { ...prevState };
      pd.id = response.data.item.id;
      pd.email = response.data.item.email;
      pd.firstName = response.data.item.firstName;
      pd.lastName = response.data.item.lastName;
      pd.dob = new Date(response.data.item.dob).toLocaleDateString();
      pd.avatarUrl = response.data.item.avatarUrl;
      pd.isLoggedIn = true;

      return pd;
    });
    netEventService
      .myEvents(0, 10, response.data.item.id)
      .then(onMyEventsSuccess)
      .catch(onMyEventsError);
  };

  const onGetCurrentError = (error: AxiosError) => {
    setCurrentUser((prevState) => {
      const pd = { ...prevState };
      pd.id = 0;
      pd.email = "";
      pd.firstName = "";
      pd.lastName = "";
      pd.dob = "";
      pd.avatarUrl = "";
      pd.isLoggedIn = false;

      return pd;
    });
  };

  const onGetEventsSuccess = (response: AxiosResponse) => {
    const dataArr = response.data.item.pagedItems;
    setEvents(dataArr);
    setPaginData(dataArr);
  };
  const onGetEventsError = (error: AxiosError) => {
    toastr.error("Something went wrong with fetching events");
  };

  useEffect(() => {
    netUserService.current().then(onGetCurrentSuccess).catch(onGetCurrentError);
    netEventService
      .getAll(0, 10)
      .then(onGetEventsSuccess)
      .catch(onGetEventsError);
  }, [currentUser.isLoggedIn]);

  const routeMapper = (route: any) => {
    return (
      <Route path={route.path} key={route.path} element={<route.element />} />
    );
  };

  return (
    <div className="mw-100">
      <Suspense fallback={<Loading />}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <NavbarLanding />
          <EventContext.Provider
            value={{
              events,
              paginData,
              myEvents,
              setMyEvents,
              setPaginData,
              mainEvent,
              setMainEvent,
            }}
          >
            <Routes>{allRoutes.map(routeMapper)}</Routes>
          </EventContext.Provider>
        </UserContext.Provider>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

//tasks
//remove inlien styles
//lazy loading???
//css
//toastr location
//main page???
//responsiveness
//page change????

//paginated return not working
