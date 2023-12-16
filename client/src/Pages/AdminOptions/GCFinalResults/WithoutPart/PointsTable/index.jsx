import Table from '../../../../../components/Table';
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../redux/axiosInstance";
import React from 'react';

const ParticipantsTable = ({ competitionId }) => {
    const [competition, setCompetition] = useState([]);
    const pageLimit = 8;

    useEffect(() => {
        getParticipants(); // Fetch data every time the component is rendered
      });

    const getParticipants = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + `/GCFinalResultsNoPart/${competitionId}`;
            const { data } = await axiosInstance.get(url);
            setCompetition(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const transformData = () => {
        if (competition && competition.participants) {
            return competition.participants.map((p) => {
                return {
                    Position:p.Position,
                    Hostel: p.hostelNo,
                    Points:p.Points
                };
            });
        } else {
            return []; // Return an empty array if competition or participants is undefined
        }
    };

    const columns = ["Position", "Hostel","Points"];

    return (
        <div>
            <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
        </div>
    );
};

export default ParticipantsTable;
