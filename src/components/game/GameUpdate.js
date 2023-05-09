import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllGametypes, getGameById, updateGame } from "../../managers/GameManager";


export const GameUpdate = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gametypes, setGametypes] = useState([]);
  const [game, setGame] = useState({});
  const [currentGame, setCurrentGame] = useState({
    title: "",
    maker: "",
    number_of_players: "",
    skill_level: "",
    game_type: 0,
  });
  //   useEffect(() => {
  //     getEventById(eventId).then((res) => setEvent(res));
  //   }, [eventId]);
  useEffect(() => {
    getGameById(gameId).then((res) => {
      setGame(res);
      setCurrentGame({
        ...currentGame,
        title: res?.title,
        maker: res?.maker,
        number_of_players: res?.number_of_players,
        skill_level: res?.skill_level,
        game_type: parseInt(res?.game_type?.id)
      });
    });
  }, [gameId, currentGame]);

  useEffect(() => {
    getAllGametypes().then((data) => setGametypes(data));
  }, []);

  const changeGameState = (evt) => {
    const { name, value } = evt.target;
    setCurrentGame({ ...currentGame, [evt.target.name]: value });
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__description">Update Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            placeholder={game.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            placeholder={game.maker}
            required
            autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="number_of_players">Number of players: </label>
          <input
            type="number"
            placeholder={game.number_of_players}
            name="number_of_players"
            required
            autoFocus
            className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="game_type">Game Type: </label>
          <select name="game_type" onChange={changeGameState}>
            <option defaultValue={game?.game_type?.id}>{game?.game_type?.label}</option>
            {gametypes.map((game_type) => (
              <option key={game_type.id} value={game_type.id}>
                {game_type.label}
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

          const game = {
            title: currentGame?.title,
            maker: currentGame?.maker,
            number_of_players: currentGame?.number_of_players,
            skill_level: currentGame?.skill_level,
            game_type: parseInt(currentGame?.game_type)
          };

          // Send POST request to your API
          updateGame(game, gameId).then(() => navigate("/games"));
        }}
        className="btn btn-primary"
      >
        Update Game
      </button>
    </form>
  );
};
