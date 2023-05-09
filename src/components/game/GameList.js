import React, { useEffect, useState } from "react";
import { deleteGame, getAllGames } from "../../managers/GameManager.js";
import { Link, useNavigate } from "react-router-dom";

export const GameList = (props) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllGames().then((data) => setGames(data));
  }, []);

  const deleteGameEvent = (game) => {
    deleteGame(game.id).then(() => {
      getAllGames().then((data) => setGames(data));
    });
  };
  
  return (
    <article className="games">
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
      {games.map((game) => {
        return (
          <section key={`game--${game.id}`} className="game">
            <div className="game__title">
              <h3>
                <Link to={`/games/${game.id}/edit`}>{game.title}</Link>
              </h3>
              by {game.maker}
            </div>
            <div className="game__players">
              {game.number_of_players} players needed
            </div>
            <div className="game__skillLevel">
              Skill level is {game.skill_level}
            </div>
            <button onClick={() => deleteGameEvent(game)}>Delete</button>
          </section>
        );
      })}
    </article>
  );
};
