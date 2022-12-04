import { useState } from "react";
import { aEvent } from "../../types/Types";
import MyModal from "../modal/MyModal";

interface IBigEventCardProps {
  event: aEvent;
}

function BigEventCard({ event }: IBigEventCardProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(!show);
  };
  const handleViewMoreClick = () => {
    setShow(!show);
  };

  return (
    <div className="card m-2 bg-light w-100">
      <h1 className="fw-bold mt-3">{event.headline}</h1>
      <div className="card-img mt-2 h-auto w-auto">
        <img
          src={event.imageUrl}
          alt=""
          className="img-fluid img-thumbnail mainevent-img"
        />
      </div>
      <div className="pb-2">
        <div className="card-body">
          <p>
            Start: {new Date(event.metaData[0].dateStart).toLocaleDateString()}{" "}
            {""}
            {new Date(event.metaData[0].dateStart).toLocaleTimeString()}
          </p>
          <p>
            End: {new Date(event.metaData[0].dateEnd).toLocaleDateString()} {""}
            {new Date(event.metaData[0].dateEnd).toLocaleTimeString()}
          </p>
          <p>{event.description}</p>
        </div>
        <div className="row">
          <div className="col-6">
            <button className="btn btn-warning" onClick={handleViewMoreClick}>
              View More
            </button>
          </div>
        </div>
      </div>
      <MyModal show={show} handleClose={handleClose} event={event} />
    </div>
  );
}

export default BigEventCard;
