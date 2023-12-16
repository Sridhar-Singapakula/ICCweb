import React, { useState, useEffect } from 'react';
import Table from '../../../../components/Table';
import axiosInstance from '../../../../redux/axiosInstance';
import { toast } from 'react-toastify';
import DeleteResult from "./delete"

const AllGCFinalResults = () => {
  const [gcFinalResults, setGCFinalResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const columns = ['Name', 'Participants', 'Date of Creation',"Delete Results"];

  const pageLimit = 8;

  useEffect(() => {
    getGCFinalResults();
  }, []);

  const openPop = (eventId,name,participantsTable,Date) => {
    setSelected({
      id: eventId,
      name:name,
      participantsTable:participantsTable,
      date:Date,
    });
  };

  const closePop = () => {
    setSelected(null);
  };

  const getGCFinalResults = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/GCFinalResults';
      const { data } = await axiosInstance.get(url);
      console.log(data)
      setGCFinalResults(data.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch GC Final Results.');
    }
  };

  const transformData = () => {
    return gcFinalResults.map((result) => {
      const participantsTable = (
        <table style={{fontSize:"10px"}}>
          <thead>
            <tr style={{background:"#181818",color:"white"}}>
              <th>Roll No</th>
              <th>Name</th>
              <th>Hostel No</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {result.participants.map((participant, index) => (
              <tr key={index} className='tr_d'>
                <td>{participant.rollNo}</td>
                <td>{participant.name}</td>
                <td>{participant.hostelNo}</td>
                <td>{participant.Points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
  
      return {
        Name: result.name,
        Participants: participantsTable,
        'Date of Creation': new Date(result.dateOfCreation).toDateString(),
         'Delete Results': (
            <button
              className="button-17"
              onClick={() =>
                openPop(result._id,result.name,participantsTable,new Date(result.dateOfCreation).toDateString())
              }
            >
              Delete Results
            </button>
          ),
      };
    });
  };
  

  return (
    <div>
      <div className="container_">
        <h1 style={{ color: 'white', fontWeight: '600', marginBottom: '30px' }}>All GC Final Results</h1>
        <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
        {selected && (
          <DeleteResult
            id={selected.id}
            name={selected.name}
            participantsTable={selected.participantsTable}
            date={selected.date}
            onClose={closePop}
          />
        )}

      </div>
    </div>
  );
};

export default AllGCFinalResults;
