import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import './style.css';
import axiosInstance from '../../redux/axiosInstance';
import Navbar from '../../components/Navbar';
import BarGraph from '../../components/BarChart';
import ICClogo from "../../img/images/ICClogo.png";
import { useHistory, Link } from "react-router-dom";


const ClientDetails = () => {
  const [hostels, setHostels] = useState([]);
  const [results, setResults] = useState([]);
  const [competition,setCompetitions] = useState([]);
  const [GroupCompetition,setGroupCompetitions] = useState([]);
  const [FinalResults,setFinalResults] = useState([]);
  const [GroupFinalResults,setGroupFinalResults] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const hostelColumns = ['HostelName', 'TotalGCPoints', 'NoOfGold'];
  const [search, setSearch] = useState("");

  const hostelPageLimit = 10;
 

  useEffect(() => {
    getHostels();
    handleSearch({ currentTarget: { value: null } });
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
  const handleSearch = async ({ currentTarget: input }) => {
		setSearch(input.value);
		try {
      const url = process.env.REACT_APP_API_URL + (input.value ? `/search/?search=${input.value}` : '/search/');
			const { data } = await axiosInstance.get(url);
			setResults(data);
		} catch (error) {
			console.log(error);
			setIsFetching(false);
		}
	};
  const mergedData = [...results].sort((a, b) => {
    const dateA = new Date(a.dateOfCreation);
    const dateB = new Date(b.dateOfCreation);
    return dateA - dateB; // Sort in descending order (latest date first)
  });
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
    labels: hostels
    .sort((a, b) => b.totalGCpoints - a.totalGCpoints)
    .map((hostel) => hostel.hostelName),
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
        // borderColor: 'black',
        borderWidth: 1,
        barPercentage: 0.7, // Adjust the width of the bars (70% of available space)
        categoryPercentage: 0.8, // Adjust the spacing between bars (80% of available space)
        datalabels: {
          display: true,
          color: 'black', // Adjust the color as needed
          align: 'center', // Adjust the alignment as needed
          anchor: 'end', // Adjust the anchor position as needed
          font: {
            size: 14, // Adjust the font size as needed
            weight: 'bold', // Adjust the font weight as needed
          },
          formatter: (value) => value, // Display the data value on top of the bar
        },
        
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          autoSkip: false,
          fontSize: 12, // Adjust the font size for mobile
          fontWeight: 'bold',
        },
      },
    },
    layout: {
      padding: {
        left: 10, // Adjust the left padding to increase the space between bars
        right: 10, // Adjust the right padding to increase the space between bars
      },
    },
  };
  const hostelcultColumns = ['Roll_No', 'Name', 'Hostel'];
  
  const FinalResultColumns = ['Roll_No', 'Name', 'Hostel',"Points"];
  const FinalResultNoPartColumns = [ 'Position', 'Hostel',"Points"];
  const IndPerformanceRankings = [ 'Position', "Name",'Hostel'];
  const GroupPerformanceRankings = [ 'Position','Hostel'];
  // Merge events and competition arrays, sort by date
  // const mergedData = [...events, ...competition,...GroupCompetition,...FinalResults,...GroupFinalResults].sort((a, b) => {
  //   const dateA = new Date(a.dateOfCreation);
  //   const dateB = new Date(b.dateOfCreation);
  //   return dateA - dateB; // Sort in descending order (latest date first)
  // });
  const transformCompetitionData = (data) => {
    return data.participants.map((competition) => ({
      Roll_No: competition.rollNo,
      Name: competition.name,
      Hostel: competition.hostelNo,
      // Add any other competition-specific properties here
    }));
  };
  const transformFinalResultsNoPart = (data) => {
    return data.participants.map((competition) => ({
      Position:  <span>{ competition.Position}<sup>{getOrdinal( competition.Position)}</sup></span>,
      Hostel: competition.hostelNo,
      Points:competition.Points,
      // Add any other competition-specific properties here
    }));
  };
  const transformFinalResults = (data) => {
    return data.participants.map((p) => ({
      Roll_No: p.rollNo,
      Name: p.name,
      Hostel: p.hostelNo,
      Points:p.Points,
      // Add any other competition-specific properties here
    }));
  };
  const transformIndPerformance = (data) => {
    return data.participants.map((p) => ({
      Position:<span>{p.Position}<sup>{getOrdinal(p.Position)}</sup></span>,
      Name:p.name,
      Hostel: p.hostelNo,
      // Add any other competition-specific properties here
    }));
  };
  const transformGroupPerformance = (data) => {
    return data.participants.map((p) => ({
      Position:<span>{p.Position}<sup>{getOrdinal(p.Position)}</sup></span>,
      Hostel: p.hostelNo,
      // Add any other competition-specific properties here
    }));
  };
  function getOrdinal(number) {
    if (number % 10 === 1 && number % 100 !== 11) {
      return  "st";
    } else if (number % 10 === 2 && number % 100 !== 12) {
      return  "nd";
    } else if (number % 10 === 3 && number % 100 !== 13) {
      return "rd";
    }
    return  "th";
  }


  return (
    <div className="container">
      <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/GC" style={{ display: "flex" }}>
          <div>
          <a href="/GC" className="logo me-auto">
            <img src={ICClogo} alt="" />
          </a>
          </div>
        </Link>
        <input
          className="search__input"
					type="text"
					placeholder="Search... "
					onChange={handleSearch}
					value={search}
				/>

      </div>
    </header>
    <h2 className='title_2'>Total GC Points</h2>
      <div className='blank'>
        <BarGraph className="barGraph_1" chartData={barChartData} options={options}  />
      </div>
      <div className='back_photo'>
      <main>
      <div id="header_">
        <h1>Top Three Leading Hostels</h1>
        <h1><i class="bi bi-bookmark-star-fill" style={{color:"#FFD700"}}></i></h1>
      </div>
      <div id="leaderboard">
        <div class="ribbon"></div>
        <table>

         {hostels
      .sort((a, b) => b.totalGCpoints - a.totalGCpoints) // Sort hostels by totalGCpoints in descending order
      .slice(0, 3) // Get the top 3 hostels
      .map((hostel, index) => (
        <tr key={hostel.hostelName}>
          <td class="number">{index + 1}</td>
          <td class="name">{hostel.hostelName}</td>
          <td class="points">{hostel.totalGCpoints}</td>
        </tr>
      ))}
        </table>
      </div>
        </main>
        <div className="title_" style={{marginTop:"100px"}}>
          <h2>GC Blog</h2>
          
        </div>
        <div className="back_photo">
        {mergedData

.reverse() 
.map((item, index) => {
  if (item.Type === 'event') {
    // Render HTML for events
    return (
      <div key={index} className="card_">
        <div>
        <div className="header">
          <span className="icon">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                fillRule="evenodd"
              ></path>
            </svg>
          </span>
          <div>
        <p className="alert">{item.GC}</p>
          </div>
        
        </div>
        
        <div>
        
          <p className="message">Date: {item.Date}</p>
          <p className="message">Venue: {item.Venue}</p>
          <p className='message'>Contact your Hostel cult Cos to participate </p>
          <p className="message"> {item.Secy}</p>
        </div>
        </div>
        <div className='gc_post'>
        <img src={item.img} className='post'></img>
      </div>
        
      </div>
    );
  } else if (item.Type === 'GCparticipants') {
    // Render HTML for competitions
    return (
      <div key={index} className="card_part">
        <div className="header_part">
          <span className='icon' style={{color:'#F2EAD3'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
<path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
</svg></span>
          <p className="alert">{item.name} Participants</p>
        </div>
        {/* Render participants table */}
        <div className='GCtable_'>
        <Table  data={transformCompetitionData(item)} columns={hostelcultColumns} pageLimit={hostelPageLimit} style={{fontSize:"7px"}}/>
        </div>
      </div>
    );
  }
  else if (item.Type === 'GCFinalResults') {
    // Render HTML for competitions
    return (
      <div key={index} className="card_part">
        <div className="header_part">
          <span className='icon' style={{color:"yellow"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
<path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
</svg></span>
          <p className="alert">{item.name} Final Results</p>
        </div>
        {/* Render participants table */}
        <div className='GCtable_'>

        <Table  data={transformFinalResults(item)} columns={FinalResultColumns} pageLimit={hostelPageLimit} />
        </div>
      </div>
    );
  }
  else if (item.Type === 'GCFinalResultsnoparticipants') {
    // Render HTML for competitions
    return (
      <div key={index} className="card_part">
        <div className="header_part">
          <span className='icon' style={{color:"yellow"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
<path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
</svg></span>
          <p className="alert">{item.name} Final Results</p>
        </div>
        {/* Render participants table */}
        <div className='GCtable_'>
        <Table  data={transformFinalResultsNoPart(item)} columns={FinalResultNoPartColumns} pageLimit={hostelPageLimit} />
        </div>
      </div>
    );
  }
  else if (item.Type === 'GCPerformance') {
    // Render HTML for competitions
    return (
      <div key={index} className="card_part">
        <div className="header_part">
          <span className='icon' style={{color:"yellow"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
<path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
</svg></span>
          <p className="alert">{item.name} Performance Rankings</p>
        </div>
        {/* Render participants table */}
        <div className='GCtable_'>
        <Table data={transformIndPerformance(item)} columns={IndPerformanceRankings} pageLimit={hostelPageLimit} />
        </div>
      </div>
    );
  }
  else if (item.Type === 'GroupGCPerformance') {
    // Render HTML for competitions
    return (
      <div key={index} className="card_part">
        <div className="header_part">
          <span className='icon' style={{color:"yellow"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
<path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
</svg></span>
          <p className="alert">{item.name} Performance Rankings</p>
        </div>
        {/* Render participants table */}
        <div className='GCtable_'>
        <Table data={transformGroupPerformance(item)} columns={GroupPerformanceRankings} pageLimit={hostelPageLimit} />
        </div>
      </div>
    );
  }
  else if(item.Type==="GCgroupparticipants"){
    const linkStyle = {
      maxWidth: "100%",     // Limit the width to 100% of its container
      whiteSpace: "overflow", // Prevent text from wrapping 
      textOverflow: "ellipsis" // Show ellipsis (...) for text that overflows
    };
  
    return (
      <div key={index} className="card_part">
        <div className="header_part">
        <span className='icon' style={{color:'#F2EAD3'}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
<path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
</svg></span>
          <p className="alert">{item.name} Participants</p>
        </div>
        <p   style={{width:"100%",fontSize:"15px",marginLeft:"2%"}}>Link of Participants list : <a target= "_blank" className="message_">click here</a></p>
        
      </div>
    )
  }
  else if(item.Type==="GCGroupResult"){
    const linkStyle = {
      maxWidth: "100%",     // Limit the width to 100% of its container
      whiteSpace: "overflow", // Prevent text from wrapping 
      textOverflow: "ellipsis" // Show ellipsis (...) for text that overflows
    };
  
    return (
      <div key={index} className="card_part">
        <div className="header_part">
        <span className='icon' style={{color:"yellow"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
<path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
</svg></span>
          <p className="alert">{item.name} Final Result</p>
        </div>
        <p   style={{width:"100%",fontSize:"15px",marginLeft:"2%"}}>Link of Results : <a target= "_blank" className="message_">click here</a></p>
        
      </div>
    )
  }
  return null; // Handle other types or data that doesn't match 'event' or 'competition'
})}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
