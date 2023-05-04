import { getToken } from "../utils/getToken"

export const getAllEvents = () => {
    return fetch("http://localhost:8000/events", {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
  }

  export const getEventById = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
  }