import Table from '../../../../../components/Table';
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../redux/axiosInstance";
import React from 'react';

const ParticipantsTable = ({ competitionId }) => {
    const [competition, setCompetition] = useState([]);
    const pageLimit = 8;

    useEffect(() => {
        getParticipants();
      });

    const getParticipants = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + `/GCPerformance/${competitionId}`;
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
                    "Performance ranking":p.Position,
                    Hostel: p.hostelNo,
                    "Name":p.name,
                };
            });
        } else {
            return []; // Return an empty array if competition or participants is undefined
        }
    };

    const columns = ["Performance ranking" ,"Name","Hostel"];

    return (
        <div>
            <Table data={transformData()} columns={columns} pageLimit={pageLimit} />
        </div>
    );
};

export default ParticipantsTable;
