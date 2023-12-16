import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../redux/axiosInstance';
import FileInput from '../../../../components/Inputs/FileInput';
import axios from 'axios';
import Papa from 'papaparse'; // Import the papaparse library
import CsvFileInput from '../../../../components/Inputs/CSVFileInput';

const AddParticipantToCompetition = ({ competitionId, onClose }) => {
  const [errors, setErrors] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({
    csvFile: null,
  });

  const handleCsvFileChange = (name, file) => {
    setData((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (data.csvFile) {
      setIsFetching(true);
  
      // Use axios to download the CSV file from the URL
      console.log(data.csvFile)
      axios
      .get(process.env.REACT_APP_API_URL+'/firebase/get-csv', {
        params: {
          csvFileUrl: data.csvFile, // Pass the URL as a query parameter
        },
      })
        .then((response) => {
          const csvData = response.data;
          console.log(response);
  
          // Use papaparse to parse the downloaded CSV data
          Papa.parse(csvData, {
            complete: (result) => {
              const columnHeaders = result.data[0];

              // Find the indices of the columns for name, rollNo, and hostelNo
              const nameIndex = columnHeaders.indexOf('name');
              const rollNoIndex = columnHeaders.indexOf('rollNo');
              const hostelNoIndex = columnHeaders.indexOf('hostelNo');
  
              if (nameIndex === -1 || rollNoIndex === -1 || hostelNoIndex === -1) {
                setIsFetching(false);
                toast.error('CSV file must contain columns for name, rollNo, and hostelNo.');
              } else {
                // Map the data from the CSV file to the participants
                const participants = result.data.slice(1).map((row) => ({
                  name: row[nameIndex].toString(),
                  rollNo: row[rollNoIndex].toString(),
                  hostelNo: row[hostelNoIndex].toString(),
                }));
  
                // Make a POST request to add the participants to the competition
                const url = process.env.REACT_APP_API_URL + `/GCparticipants/${competitionId}/add-participants`;
                axiosInstance
                  .post(url, { participants })
                  .then(() => {
                    setIsFetching(false);
                    toast.success('Participants added to the competition successfully');
                    onClose();
                  })
                  .catch((error) => {
                    setIsFetching(false);
                    console.error(error);
                    toast.error('An error occurred while adding participants from the CSV file.');
                  });
              }
            },
          });
        })
        .catch((error) => {
          setIsFetching(false);
          console.error(error);
          toast.error('An error occurred while downloading the CSV file.');
        });
    } else {
      toast.error('Please upload a CSV file to add participants.');
    }
  };

  return (
    <div className="popup_container">
      <div className="popup_content">
        <h2>Add Participants to Competition from CSV</h2>
        <div className="select-container">
          <form onSubmit={handleSubmit} className="form_container">
            <CsvFileInput
              label="Upload .csv File"
              name="csvFile"
              type="file"
              handleInputState={handleCsvFileChange}
              style={{
                width: '100%',
                fontSize: '12px',
                padding: '4px',
                height: '40px',
              }}
            />
            <div className="form_bottom">
              <button
                type="submit"
                label="Add Participants"
                className="button-17"
                style={{ marginLeft: '-5px' }}
              >
                Add Participants
              </button>
            </div>
          </form>
          <button
            onClick={() => onClose()}
            className="button-17"
            style={{ marginTop: '-20px', marginLeft: '280px', fontSize: '13px' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

AddParticipantToCompetition.propTypes = {
  competitionId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddParticipantToCompetition;
