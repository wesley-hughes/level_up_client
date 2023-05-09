import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGames } from "../../managers/GameManager";
import {
  createEvent,
  getEventById,
  updateEvent,
} from "../../managers/EventManager";

export const EventUpdate = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [event, setEvent] = useState({});
  const [currentEvent, setCurrentEvent] = useState({
    description: "",
    date: "",
    time: "",
    game: 0,
    organizer: 0,
  });
  //   useEffect(() => {
  //     getEventById(eventId).then((res) => setEvent(res));
  //   }, [eventId]);
  useEffect(() => {
    getEventById(eventId).then((res) => {
      setEvent(res);
      setCurrentEvent({
        ...currentEvent,
        description: res?.description,
        date: res?.date,
        time: res?.time,
        game: parseInt(res?.game?.id)
      });
    });
  }, [eventId, currentEvent]);

  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);

  const changeEventState = (evt) => {
    const { name, value } = evt.target;
    setCurrentEvent({ ...currentEvent, [evt.target.name]: value });
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__description">Update Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentEvent.description}
            placeholder={event.description}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            name="date"
            placeholder={event.date}
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time (24H format): </label>
          <input
            type="time"
            placeholder={event.time}
            name="time"
            required
            autoFocus
            className="form-control"
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <select name="game" onChange={changeEventState}>
            <option defaultValue={event?.game?.id}>{event?.game?.title}</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* TODO: create the rest of the input fields */}

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const event = {
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            game: parseInt(currentEvent.game)
          };

          // Send POST request to your API
          updateEvent(event, eventId).then(() => navigate("/events"));
        }}
        className="btn btn-primary"
      >
        Update Event
      </button>
    </form>
  );
};
