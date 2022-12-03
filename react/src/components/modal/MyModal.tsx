import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { aEvent } from "../../types/Types";
import { UserContext } from "../../contexts/UserContext";
import { EventContext } from "../../contexts/EventContext";
import netEventService from "../../services/eventService";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
let key = process.env.REACT_APP_GOOGLE_API_KEY;

interface MyModalProps {
  show: boolean;
  handleClose: any;
  event: aEvent;
}

function MyModal({ show, handleClose, event }: MyModalProps) {
  const { currentUser } = useContext(UserContext);
  const { setMyEvents, myEvents } = useContext(EventContext);

  const navigate = useNavigate();

  const onJoinSuccess = (response: AxiosResponse) => {
    toastr.success("Successfully joined event!", "Check my events");
    navigate("/myevents");
    setMyEvents((prevState: aEvent[]) => {
      const pd = [...prevState, event];

      return pd;
    });
    console.log(myEvents);
  };
  const onJoinError = (error: AxiosError) => {
    toastr.error("An error occured...");
  };

  const onJoinClick = () => {
    netEventService
      .volunteer(currentUser.id, event.id)
      .then(onJoinSuccess)
      .catch(onJoinError);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{event.headline}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ height: "auto", width: "100%" }}>
          <img
            src={event.imageUrl}
            alt=""
            className="img-fluid img-thumbnail"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "inherit",
              objectFit: "cover",
            }}
          />
        </div>
        <h2 className="mt-4">{event.headline}</h2>
        <h5>Slug:</h5>
        <p>{event.slug}</p>
        <h3>Summary:</h3>
        <p>{event.summary}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <div className="col-6">
          <iframe
            title="map"
            src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${event.metaData[0].location[0].buildingNumber} ${event.metaData[0].location[0].street} ${event.metaData[0].location[0].city}, ${event.metaData[0].location[0].state} ${event.metaData[0].location[0].zipCode}`}
            style={{ border: "0", width: "100%", height: "180px" }}
            loading="lazy"
          ></iframe>
        </div>
        <h3>Location:</h3>
        <p>
          {event.metaData[0].location[0].buildingNumber}{" "}
          {event.metaData[0].location[0].street}{" "}
          {event.metaData[0].location[0].city}
          {", "}
          {event.metaData[0].location[0].state}{" "}
          {event.metaData[0].location[0].zipCode}
        </p>
        <p>
          Start Date:{" "}
          {new Date(event.metaData[0].dateStart).toLocaleDateString()}{" "}
          {new Date(event.metaData[0].dateStart).toLocaleTimeString()}
        </p>
        <p>
          End Date: {new Date(event.metaData[0].dateEnd).toLocaleDateString()}{" "}
          {new Date(event.metaData[0].dateEnd).toLocaleTimeString()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {currentUser.isLoggedIn &&
        myEvents.findIndex((thisEvent) => {
          return thisEvent.id === event.id;
        }) < 0 ? (
          <Button variant="primary" onClick={onJoinClick}>
            Join
          </Button>
        ) : (
          ""
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
