import { useContext } from "react";
import "../../assets/css/events.css";
import "../../assets/css/landing.css";
import MainEvent from "./MainEvent";
import UpcomingEvents from "./UpcomingEvents";
import { EventContext } from "../../contexts/EventContext";

function MyEvents() {
  const { myEvents } = useContext(EventContext);
  return myEvents.length > 0 ? (
    <div className="landing-bg">
      <div className="row d-flex align-content-center">
        <h1 className="fw-bold text-center">My Events</h1>
        <MainEvent />
        <div className="right-panel float-left">
          <UpcomingEvents />
        </div>
      </div>
    </div>
  ) : (
    <div className="landing-bg min-vh-100">
      <div className="container pt-5">
        <h1 className="fw-bold text-center">
          You have no signed up events yet!
        </h1>
        <h2 className="fw-bold text-center">
          Would you like to <a href="/events/new">create one?</a>
        </h2>
      </div>
    </div>
  );
}
export default MyEvents;
