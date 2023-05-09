import { getToken } from "../utils/getToken"

export const getAllGames = () => {
    return fetch("http://localhost:8000/games", {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
  }

  export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify(game)
    })
      .then(res => res.json())
  }
  export const getGameById = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
  }
export const getGameTypes = () => {
  return fetch("http://localhost:8000/gametypes", {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}
export const getAllGametypes = () => {
  return fetch("http://localhost:8000/gametypes", {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  })
    .then(res => res.json())
}
export const updateGame = (updatedGame, gameId) => {
  return fetch(`http://localhost:8000/games/${gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`
    },
    body: JSON.stringify(updatedGame)
  })
  .then(res => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  })
  .catch(error => console.log(error));
};
export const deleteGame = (id) => {
  return fetch(`http://localhost:8000/games/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${getToken()}`
    }
  }
  )
}