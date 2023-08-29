import React from 'react';
import "./style.css";

const TimelineComponent = ({ events }) => {
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div className="timeline-row" key={index}>
          <div className="timeline-time">
            {event.time}
            <small>{event.date}</small>
          </div>
          <div className={`timeline-dot ${event.color}-bg`}></div>
          <div className={`timeline-content ${event.color}`}>
            <i className={event.icon}></i>
            <h4>{event.eventName}</h4>
            <p>{event.description}</p>
            <div>
              {event.tags.map((tag, tagIndex) => (
                <span className="badge badge-light" key={tagIndex}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineComponent;
