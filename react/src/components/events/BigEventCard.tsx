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
    <div className="card m-2" style={{ width: "100%" }}>
      <h1 className="fw-bold mt-3">{event.headline}</h1>
      <div
        className="card-img mt-2"
        style={{ height: "auto", width: "inherit" }}
      >
        <img
          src={event.imageUrl}
          alt=""
          className="img-fluid img-thumbnail"
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ paddingBottom: "2%" }}>
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
            <button className="btn btn-light" onClick={handleViewMoreClick}>
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
