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

  export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify(event)
    })
      .then(res => res.json())
  }
  export const updateEvent = (updatedEvent, eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify(updatedEvent)
    })
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch(error => console.log(error));
  };
  export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${getToken()}`
      }
    }
    )
  }
  export const leaveEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${getToken()}`
      }
    }
    )
  }
  export const joinEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify()
    })
      .then(res => res.json())
  }