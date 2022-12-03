import React, { useState, useEffect, useContext } from "react";
import Pagination from "rc-pagination";
import { aEvent } from "../../types/Types";
import { EventContext } from "../../contexts/EventContext";
import "../../assets/css/landing.css";
import BigEventCard from "./BigEventCard";
import SearchBox from "./SearchBox";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

function Events() {
  const { events, paginData, setPaginData } = useContext(EventContext);
  const [pages, setPages] = useState({
    defaultPageSize: 3,
    pageIndex: 0,
    currentPage: 1,
    totalCards: 0,
  });
  const [components, setComponents] = useState<Array<React.ReactNode>>([]);
  const navigate = useNavigate();

  const mapArr = (event: aEvent) => {
    return <BigEventCard event={event} key={event.id} />;
  };

  const onPageChange = (page: number) => {
    const currentPage = page;
    const currentPageIndex = page - 1;

    setPages((prevState) => {
      const pd = { ...prevState };
      pd.currentPage = currentPage;
      pd.pageIndex = currentPageIndex;

      setComponents(() => {
        return paginData
          .slice(
            currentPageIndex * pages.defaultPageSize,
            currentPage * pages.defaultPageSize
          )
          .map(mapArr);
      });

      return pd;
    });
  };
  useEffect(() => {
    setComponents(() => {
      return paginData.slice(0, 3).map(mapArr);
    });
    setPages((prevState) => {
      const pd = { ...prevState };
      pd.totalCards = paginData.length;
      return pd;
    });
  }, [paginData]);

  const onResetClick = () => {
    toastr.success("Reset events");
    setPaginData(events);
  };
  const onMapClick = () => {
    const stateForTransport = {
      type: "EVENT_MAP_VIEW",
      payload: paginData,
    };
    navigate("/map", { state: stateForTransport });
  };

  return (
    <div className="landing-bg">
      <h1 className="fw-bold text-center pt-4">Browse Events</h1>
      <div className="container border mt-4 rounded bg-white">
        <div className="container mt-3 rounded bg-white">
          <SearchBox />
        </div>
        <div className="container-fluid d-table justify-content-center">
          <div className="row container">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onResetClick}
              >
                Reset Events
              </button>
            </div>
            <div className="col-6 text-end">
              <button
                type="button"
                className="btn btn-success"
                onClick={onMapClick}
              >
                Open Map
              </button>
            </div>
          </div>
          <div className="container m-3">
            <Pagination
              defaultPageSize={pages.defaultPageSize}
              current={pages.currentPage}
              onChange={onPageChange}
              total={pages.totalCards}
            />
          </div>
          <div className="row justify-content-around">{components}</div>
        </div>
        <div className="container m-3">
          <Pagination
            defaultPageSize={pages.defaultPageSize}
            current={pages.currentPage}
            onChange={onPageChange}
            total={pages.totalCards}
          />
        </div>
      </div>
    </div>
  );
}

export default Events;
