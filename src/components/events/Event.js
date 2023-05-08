import { Link } from "react-router-dom";

export const Event = (event) => {

  return (
    <>
      <section className="event">
      <h3><Link to={`/events/${event.id}/edit`}>Description {event.description}</Link></h3>
        <footer className="event__footer event__footer--detail">
          <div className="footerItem">Game: {event.game.title}</div>
          <div className="footerItem">Date: {event.date}</div>
          <div className="footerItem">Time: {event.time}</div>
          <div className="footerItem">
            Organizer: {event.organizer.full_name}
          </div>
          <div className="footerItem">
            Attendees:{" "}
            {
            event.attendees.map(attendee => <div>{attendee.full_name}</div>)
            }
              </div>
        </footer>
      </section>
    </>
  );
};
