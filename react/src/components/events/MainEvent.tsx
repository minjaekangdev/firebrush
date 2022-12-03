import { useContext, useEffect } from "react";
import { EventContext } from "../../contexts/EventContext";
import { aEvent } from "../../types/Types";
let key = process.env.REACT_APP_GOOGLE_API_KEY;

function MainEvent() {
  const { myEvents, mainEvent, setMainEvent } = useContext(EventContext);

  useEffect(() => {
    setMainEvent((prevState: aEvent): aEvent => {
      const pd = { ...prevState };
      pd.id = myEvents[0].id;
      pd.headline = myEvents[0].headline;
      pd.summary = myEvents[0].summary;
      pd.description = myEvents[0].description;
      pd.metaData = [
        {
          dateStart: myEvents[0].metaData[0].dateStart,
          dateEnd: myEvents[0].metaData[0].dateEnd,
          location: [
            {
              buildingNumber:
                myEvents[0].metaData[0].location[0].buildingNumber,
              street: myEvents[0].metaData[0].location[0].street,
              city: myEvents[0].metaData[0].location[0].city,
              state: myEvents[0].metaData[0].location[0].state,
              zipCode: myEvents[0].metaData[0].location[0].zipCode,
              latitude: myEvents[0].metaData[0].location[0].latitude,
              longitude: myEvents[0].metaData[0].location[0].longitude,
            },
          ],
        },
      ];
      pd.slug = myEvents[0].slug;
      pd.imageUrl = myEvents[0].imageUrl;
      pd.dateCreated = myEvents[0].dateCreated;
      pd.dateModified = myEvents[0].dateModified;

      return pd;
    });
  }, []);

  return (
    <div className="main-event p-4 rounded ml-5">
      <div className="row">
        <h2>{mainEvent.headline}</h2>
        <img
          className="img-fluid event-img"
          src={mainEvent.imageUrl}
          alt="eventimg"
        />
        <p>{mainEvent.summary}</p>
        <p>{mainEvent.description}</p>
        <div className="row d-flex justify-content-between">
          <div className="col-6">
            <iframe
              title="map"
              src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${mainEvent.metaData[0].location[0].buildingNumber} ${mainEvent.metaData[0].location[0].street} ${mainEvent.metaData[0].location[0].city}, ${mainEvent.metaData[0].location[0].state} ${mainEvent.metaData[0].location[0].zipCode}`}
              style={{ border: "0", width: "100%", height: "180px" }}
              loading="lazy"
            ></iframe>
          </div>
          <div className="col-6">
            <h6 style={{ fontSize: "20px" }}>Location</h6>
            <p id="mainLocation">
              {mainEvent.metaData[0].location[0].buildingNumber}{" "}
              {mainEvent.metaData[0].location[0].street}{" "}
              {mainEvent.metaData[0].location[0].city}
              {", "}
              {mainEvent.metaData[0].location[0].state}{" "}
              {mainEvent.metaData[0].location[0].zipCode}
            </p>
            <p>
              Start Date:{" "}
              {new Date(mainEvent.metaData[0].dateStart).toLocaleDateString()}{" "}
              {new Date(mainEvent.metaData[0].dateStart).toLocaleTimeString()}
            </p>
            <p>
              End Date:{" "}
              {new Date(mainEvent.metaData[0].dateEnd).toLocaleDateString()}{" "}
              {new Date(mainEvent.metaData[0].dateEnd).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainEvent;
