import { useEffect, useState } from "react";
import { getAllEvents } from "../../managers/EventManager";
import { Event } from "./Event";
import { getAllGames } from "../../managers/GameManager";
import { getToken } from "../../utils/getToken";
import { useNavigate } from "react-router-dom";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const [gameId, setGameId] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    getAllEvents().then((res) => setEvents(res));
  }, []);
  useEffect(() => {
    getAllGames().then((res) => setGames(res));
  }, []);
  const filterEventsByGame = (game) => {
    fetch(`http://localhost:8000/events?game=${game}`, {
      headers: {
        Authorization: `Token ${getToken()}`
      }
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
      filterEventsByGame(gameId)
    }
  }, [gameId]);

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
        {events.map((event) => Event(event))}
      </article>
    </>
  );
};
