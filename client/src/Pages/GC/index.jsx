import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import './style.css';
import axiosInstance from '../../redux/axiosInstance';
import Navbar from '../../components/Navbar';
import BarGraph from '../../components/BarChart';
import right from "../../img/images/17924.png";
import left from "../../img/images/left.png";

const ClientDetails = () => {
  const [hostels, setHostels] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const hostelColumns = ['HostelName', 'TotalGCPoints', 'NoOfGold'];
  const hostelPageLimit = 20;

  useEffect(() => {
    getHostels();
  }, []);

  const getHostels = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + '/GC';
      const { data } = await axiosInstance.get(url);
      
      setHostels(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const transformHostelData = () => {
    return hostels
    .sort((a, b) => b.totalGCpoints - a.totalGCpoints)
    .map((hostel) => {
      return {
        HostelName: hostel.hostelName,
        TotalGCPoints: hostel.totalGCpoints ?? 0,
        NoOfGold: hostel.numberOfGold ?? 0,
      };
    });
  };

  const findHighestTotalGCPointsHostel = () => {
    if (hostels.length === 0) {
      return null;
    }

    return hostels.reduce((highestHostel, currentHostel) => {
      if (currentHostel.totalGCpoints > highestHostel.totalGCpoints) {
        return currentHostel;
      } else {
        return highestHostel;
      }
    });
  };

  const highestTotalGCPointsHostel = findHighestTotalGCPointsHostel();

  const barChartData = {
    labels: hostels.map((hostel) => hostel.hostelName),
    datasets: [
      {
        label: 'Total GC Points',
        data: hostels.map((hostel) => hostel.totalGCpoints),
        backgroundColor: [
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
          '#61677A',
          '#7C73C0',
          '#2D4356',
          '#FFBDF7',
          '#F2EAD3',
          '#967E76',
          '#674188',
          '#CFF5E7',
        ],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontSize: 14,
        fontColor: '#333',
        fontStyle: 'bold',
      },
    },
  };

  return (
    <div className="container">
      <Navbar />
      <div className="blank">
        <BarGraph chartData={barChartData} options={options} style={{ width: 700 }} />
      </div>
      <div className='back_photo'>
        <div className="section-title" >
          <h2>GC Points Table</h2>
        </div>
        <div className='congo'>
          {highestTotalGCPointsHostel ? (
            <>
              <div>
                <img src={left} alt="Left Image"></img>
              </div>
              <div>
                <h3><strong>{highestTotalGCPointsHostel.hostelName}</strong></h3>
              </div>
              <div>
                <img src={right} alt="Right Image"></img>
              </div>
            </>
          ) : (
            <p>No hostels data available.</p>
          )}
        </div>
        <div className='table_data'>
          {hostels.length > 0 ? (
            <Table data={transformHostelData()} columns={hostelColumns} pageLimit={hostelPageLimit} />
          ) : (
            <p>No hostels data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
