import { useContext } from "react";
import { aEvent } from "../../types/Types";
import netEventServices from "../../services/eventService";
import { UserContext } from "../../contexts/UserContext";
import { AxiosError, AxiosResponse } from "axios";
import toastr from "toastr";
import { EventContext } from "../../contexts/EventContext";

interface IEventCardProps {
  event: aEvent;
}

function EventCard({ event }: IEventCardProps) {
  const { currentUser } = useContext(UserContext);
  const { myEvents, setMyEvents, setMainEvent } = useContext(EventContext);
  const onViewMoreClick = () => {
    setMainEvent((prevState: aEvent): aEvent => {
      const pd = { ...prevState };
      pd.id = event.id;
      pd.headline = event.headline;
      pd.summary = event.summary;
      pd.description = event.description;
      pd.metaData = [
        {
          dateStart: event.metaData[0].dateStart,
          dateEnd: event.metaData[0].dateEnd,
          location: [
            {
              buildingNumber: event.metaData[0].location[0].buildingNumber,
              street: event.metaData[0].location[0].street,
              city: event.metaData[0].location[0].city,
              state: event.metaData[0].location[0].state,
              zipCode: event.metaData[0].location[0].zipCode,
              latitude: event.metaData[0].location[0].latitude,
              longitude: event.metaData[0].location[0].longitude,
            },
          ],
        },
      ];
      pd.slug = event.slug;
      pd.imageUrl = event.imageUrl;
      pd.dateCreated = event.dateCreated;
      pd.dateModified = event.dateModified;

      return pd;
    });
  };

  const onRemoveSuccess = (response: AxiosResponse) => {
    const index = myEvents.findIndex((thisEvent) => {
      return thisEvent.id === event.id;
    });

    if (index >= 0) {
      setMyEvents((prevState: Array<aEvent>) => {
        const pd = [...prevState];
        pd.splice(index, 1);
        toastr.success("Removed from my events");

        return pd;
      });
    }
  };

  const onRemoveError = (error: AxiosError) => {
    toastr.error("An error occurred");
    console.log(error);
  };

  const onRemoveClick = () => {
    netEventServices
      .unvolunteer(currentUser.id, event.id)
      .then(onRemoveSuccess)
      .catch(onRemoveError);
  };
  return (
    <div className="card m-2 w-100 h-100">
      <div className="pb-2">
        <div className="card-body">
          <h5>{event.headline}</h5>
          <p>
            Start Date:{" "}
            {new Date(event.metaData[0].dateStart).toLocaleDateString()}{" "}
            {new Date(event.metaData[0].dateStart).toLocaleTimeString()}
          </p>
          <p>{event.summary}</p>
          <p>{event.description}</p>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="btn btn-light" onClick={onViewMoreClick}>
              View More
            </button>
            <button className="btn btn-warning mx-3" onClick={onRemoveClick}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
