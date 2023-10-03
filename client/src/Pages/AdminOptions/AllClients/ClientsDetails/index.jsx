import React, { useEffect, useState } from 'react';
import Table from '../../../../components/Table';
import { useSelector } from 'react-redux';
import "./style.css";
import axiosInstance from "../../../../redux/axiosInstance";
import EditClient from "../EditClient"

const GCPoints = () => {
  const [hostels, setHostels] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const columns = ["HostelName","TotalGCPoints","NoOfGold","AddPoints"];
  const pageLimit = 10;

  useEffect(() => {
    getHostels();
  }, []);

  const getHostels = async () => {
    try {
      setIsFetching(true);
      const url = process.env.REACT_APP_API_URL + `/GC`;
      const { data } = await axiosInstance.get(url);
      setHostels(data.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const openUpload = (clientId,totalGCpoints,NoOfGold,hostelName) => {
    setSelectedClientId({ id: clientId, points:totalGCpoints,numberOfGold:NoOfGold,name:hostelName});
  };

  const closeUpload = () => {
    setSelectedClientId(null);
  };

  const transformData = () => {
    return hostels
      .map((hostel) => {
       
        return {
        HostelName: hostel.hostelName,
        TotalGCPoints: hostel.totalGCpoints ?? 0,
        NoOfGold: hostel.numberOfGold ?? 0,
        AddPoints:<button className="button-17" onClick={() => openUpload(hostel._id,hostel.totalGCpoints,hostel.NoOfGold,hostel.hostelName)} >Add+</button>
        };
      });
  };

  return (
    <div className="container">
      <h1 style={{ color: "white", fontWeight: "600", marginBottom: "30px" }}>
        GC Points
      </h1>
      <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
      {selectedClientId && <EditClient hostelId={selectedClientId.id} points={selectedClientId.points} numberOfGold={selectedClientId.numberOfGold} hostelName={selectedClientId.name} onClose={closeUpload} />}
    </div>
  );
};

export default GCPoints;
