import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import axiosInstance from '../../../redux/axiosInstance';
import { toast } from 'react-toastify';
import DeleteEvent from "./delete"

const Events = () => {
  const [events, setEvents] = useState([]);
  const columns = ['GC', 'Venue', 'Date', 'Secy','DeleteEvent']; // Add/Edit columns as needed
  const [selected, setSelected] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const pageLimit = 8;

  useEffect(() => {
    getEvents();
  }, []);

  const openPop = (eventId,eventGC,eventVenue,eventDate,eventImg,eventSecy) => {
    setSelected({
      id: eventId,
      GC:eventGC,
      venue : eventVenue ,
      date : eventDate ,
      img : eventImg ,
      secy : eventSecy ,
    });
  };

  const closePop = () => {
    setSelected(null);
  };

  const getEvents = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/event`; // Update the API endpoint
      const { data } = await axiosInstance.get(url);
      setEvents(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const transformData = () => {
    return events.map((event) => {
      return {
        GC: event.GC,
        Venue: event.Venue,
        Date: event.Date,
        Secy: event.Secy,
        DeleteEvent: (
          <button
            className="button-17"
            onClick={() =>
              openPop(event._id,event.GC,event.Venue,event.Date,event.img,event.Secy)
            }
          >
            Delete Event
          </button>
        ),
      };
    });
  };

  return (
    <div>
      <div className="container">
        <h1 style={{ color: 'white', fontWeight: '600', marginBottom: '30px' }}>ALL Event Details</h1>
        <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
        {selected && (
          <DeleteEvent
            eventId={selected.id}
            GC ={selected.GC}
            venue= {selected.venue}
            date= {selected.date}
            img=  {selected.img}
            secy ={selected.secy}
            onClose={closePop}
          />
        )}
      </div>
    </div>
  );
};

export default Events;
