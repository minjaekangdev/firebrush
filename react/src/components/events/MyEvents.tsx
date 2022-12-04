import { useContext } from "react";
import "../../assets/css/events.css";
import MainEvent from "./MainEvent";
import UpcomingEvents from "./UpcomingEvents";
import { EventContext } from "../../contexts/EventContext";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function MyEvents() {
  const { myEvents } = useContext(EventContext);
  const { currentUser } = useContext(UserContext);
  return myEvents.length > 0 && currentUser.isLoggedIn ? (
    <>
      <h1 className="fw-bold text-center pt-4">My Events</h1>
      <div className="row p-4 h-100" style={{ marginBottom: "5%" }}>
        <div className="col-xl-8 float-left mb-2">
          <MainEvent />
        </div>
        <div className="col-xl-4 float-left">
          <UpcomingEvents />
        </div>
      </div>
    </>
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
