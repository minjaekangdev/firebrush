import { useContext } from "react";
import "../../assets/css/events.css";
import "../../assets/css/landing.css";
import MainEvent from "./MainEvent";
import UpcomingEvents from "./UpcomingEvents";
import { EventContext } from "../../contexts/EventContext";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function MyEvents() {
  const { myEvents } = useContext(EventContext);
  const { currentUser } = useContext(UserContext);
  return myEvents.length > 0 && currentUser.isLoggedIn ? (
    <div className="row p-4">
      <h1 className="fw-bold text-center">My Events</h1>
      <MainEvent />
      <div className="right-panel float-left">
        <UpcomingEvents />
      </div>
    </div>
  ) : (
    <div className="container pt-5">
      <h1 className="fw-bold text-center">You have no signed up events yet!</h1>
      <h2 className="fw-bold text-center">
        Would you like to <Link to="/events/new">create one?</Link>
      </h2>
    </div>
  );
}
export default MyEvents;
