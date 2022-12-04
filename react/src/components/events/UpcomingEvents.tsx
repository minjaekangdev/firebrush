import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
import EventCard from "./EventCard";
import { aEvent } from "../../types/Types";
import { EventContext } from "../../contexts/EventContext";
import { UserContext } from "../../contexts/UserContext";

function UpcomingEvents() {
  const [components, setComponents] = useState<Array<React.ReactNode>>([]);
  const [pages, setPages] = useState({
    defaultPageSize: 3,
    pageIndex: 0,
    currentPage: 1,
    totalCards: 0,
  });
  const { myEvents } = useContext(EventContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const mapArr = (event: aEvent) => {
    return <EventCard event={event} key={event.id} />;
  };

  const onPageChange = (page: number) => {
    const currentPage = page;
    const currentPageIndex = page - 1;

    setPages((prevState) => {
      const pd = { ...prevState };
      pd.currentPage = currentPage;
      pd.pageIndex = currentPageIndex;

      setComponents(() => {
        return myEvents
          .slice(
            currentPageIndex * pages.defaultPageSize,
            currentPage * pages.defaultPageSize
          )
          .map(mapArr);
      });

      return pd;
    });
  };

  const onNewEventClick = () => {
    navigate("/events/new");
  };

  const onViewMapClick = () => {
    const stateForTransport = {
      type: "EVENT_MAP_VIEW",
      payload: myEvents,
    };
    navigate("/map", { state: stateForTransport });
  };

  useEffect(() => {
    setComponents(() => {
      return myEvents.slice(0, 3).map(mapArr);
    });
    setPages((prevState) => {
      const pd = { ...prevState };
      pd.totalCards = myEvents.length;
      return pd;
    });
  }, [myEvents]);

  return (
    <div className="border bg-white p-3 d-table rounded w-100">
      <div className="row">
        <div className="col-8">
          <Pagination
            defaultPageSize={pages.defaultPageSize}
            current={pages.currentPage}
            onChange={onPageChange}
            total={pages.totalCards}
          />
        </div>
        <div className="col-md-4">
          <button
            className={
              currentUser.isLoggedIn
                ? "btn btn-success float-end mb-4"
                : "d-none"
            }
            onClick={onNewEventClick}
          >
            New Event
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button
            className="btn btn-secondary float-end"
            id="viewAllOnMap"
            onClick={onViewMapClick}
          >
            View All On Map
          </button>
        </div>
      </div>

      <div className="row d-table">
        <h4>My Upcoming Events</h4>
      </div>
      <div className="row w-100 h-100">{components}</div>
    </div>
  );
}
export default UpcomingEvents;
