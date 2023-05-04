import { useEffect, useState } from "react"
import { getAllEvents } from "../../managers/EventManager"
import { Event } from "./Event"

export const EventList = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    getAllEvents ().then((res) => setEvents(res))
  }, [])

  const filterEvents = (game) => {
    fetchIt(`http://localhost:8000/events?game=${game}`)
        .then((data) => {
            setEvents(data)
        })
        .catch(() => setEvents([]))
}
  return <>
  <article className="events">
    {
      events.map((event) => Event(event)
      )
    }
  </article>
</>
}