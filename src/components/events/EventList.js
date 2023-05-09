import { useEffect, useState } from "react";
import {
  deleteEvent,
  getAllEvents,
  joinEvent,
  leaveEvent,
} from "../../managers/EventManager";

import { getAllGames } from "../../managers/GameManager";
import { getToken } from "../../utils/getToken";
import { Link, useNavigate } from "react-router-dom";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const [gameId, setGameId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEvents().then((res) => setEvents(res));
  }, []);
  useEffect(() => {
    getAllGames().then((res) => setGames(res));
  }, []);
  const filterEventsByGame = (game) => {
    fetch(`http://localhost:8000/events?game=${game}`, {
      headers: {
        Authorization: `Token ${getToken()}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch(() => setEvents([]));
  };
  useEffect(() => {
    if (gameId !== 0) {
      filterEventsByGame(gameId);
    }
  }, [gameId]);

  const deleteEventHandler = (event) => {
    deleteEvent(event.id).then(() => {
      getAllEvents().then((data) => setEvents(data));
    });
  };

  return (
    <>
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/events/new" });
        }}
      >
        Register New Event
      </button>
      <article className="events">
        <select onChange={(event) => setGameId(parseInt(event.target.value))}>
          <option value="0">Choose Game</option>
          {games.map((game) => (
            <option value={game.id}>{game.title}</option>
          ))}
        </select>
        {events.map((event) => {
          return (
            <section className="event">
              <h3>
                <Link to={`/events/${event.id}/edit`}>
                  Description {event.description}
                </Link>
              </h3>
              <footer className="event__footer event__footer--detail">
                <div className="footerItem">Game: {event.game.title}</div>
                <div className="footerItem">Date: {event.date}</div>
                <div className="footerItem">Time: {event.time}</div>
                <div className="footerItem">
                  Organizer: {event.organizer.full_name}
                </div>
                <div className="footerItem">
                  Attendees:{" "}
                  {event.attendees.map((attendee) => (
                    <div>{attendee.full_name}</div>
                  ))}
                </div>
                <button onClick={() => deleteEventHandler(event)}>
                  Delete
                </button>
                {event.joined === true ? (
                  <button onClick={() => leaveEvent(event.id)}>Leave</button>
                ) : (
                  <button onClick={() => joinEvent(event.id)}>Join</button>
                )}
              </footer>
            </section>
          );
        })}
      </article>
    </>
  );
};
