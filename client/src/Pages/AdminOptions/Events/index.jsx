import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import axiosInstance from '../../../redux/axiosInstance';
import { toast } from 'react-toastify';

const Events = () => {
  const [events, setEvents] = useState([]);
  const columns = ['GC', 'Venue', 'Date', 'Secy']; // Add/Edit columns as needed
  const [selected, setSelected] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const pageLimit = 8;

  useEffect(() => {
    getEvents();
  }, []);

//   const openPop = (GC, Venue, Date, Secy, eventImg, eventId) => {
//     setSelected({
//       id: eventId,
//       GC,
//       Venue,
//       Date,
//       Secy,
//       eventImg,
//     });
//   };

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
        // EditEvent: (
        //   <button
        //     className="button-17"
        //     onClick={() =>
        //       openPop(event.GC, event.Venue, event.Date, event.Secy, event.img, event._id)
        //     }
        //   >
        //     Edit Event
        //   </button>
        // ),
      };
    });
  };

  return (
    <div>
      <div className="container">
        <h1 style={{ color: 'white', fontWeight: '600', marginBottom: '30px' }}>ALL Event Details</h1>
        <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
        {/* {selected && (
          <EditEvent
            GC={selected.GC}
            Venue={selected.Venue}
            Date={selected.Date}
            Secy={selected.Secy}
            eventImg={selected.eventImg}
            eventId={selected.id}
            onClose={closePop}
          />
        )} */}
      </div>
    </div>
  );
};

export default Events;
