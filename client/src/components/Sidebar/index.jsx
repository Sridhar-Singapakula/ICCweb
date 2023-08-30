import { useState} from "react";
import { NavLink,useHistory, Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css"
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.scss";
import logo from "../../img/images/ICClogo.png"

const Sidebar = ({ handleComponentClick }) => {
	
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
    const [dashboardMenu, setDashboardMenu] = useState(false);
	const [dataEntryMenu, setDataEntryMenu] = useState(false);
	const [patientReportsMenu,setPatientReportsMenu]= useState(false)
	const [price,setPrice]=useState(false)
	const [trackMenu,setTrackMenu]=useState(false)
	const [billing,setBilling] = useState(false)
	return (
		<div className={styles.container}>
			<Link to="/" style={{ display: "flex" }}>
        <div>
        <a href="/" className="logo me-auto">
            <img src={logo} className="logo_img" alt="" />
          </a>
        </div>
          
          <div style={{display:"block"}}>
          <div style={{fontSize:"30px", marginRight: "22px",fontWeight:"bolder",className:"font_style",letterSpacing:"2px"}}>
            <span style={{ color: "#DB4437" }}>D</span>
            <span style={{ color: "#4285F4" }}>H</span>
            <span style={{ color: "#0F9D58" }}>R</span>
            <span style={{ color: "" }}>U</span>
            <span style={{ color: "#F4B400" }}>V</span> 
          </div>
          <div style={{fontWeight:"750",fontSize: "20px",marginTop:"-7px" }}>Diagnostics</div>
          </div>
        </Link>

			<NavLink
				to="/search"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<SearchIcon />
				<span>Search</span>
			</NavLink>
			<Link to="/clientHome" ><div
				
				
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				
				
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-speedometer2" className={styles.icons}  style={{color: "#8f5fe8"}}></i></span>
				<span>Home</span>
			</div>
			</Link>
			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setDataEntryMenu(!dataEntryMenu)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-database-add" className={styles.icons} style={{color: "#ffab00"}}></i></span>
				<span>Data Entry</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{dataEntryMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{dataEntryMenu && (
				<ClickAwayListener onClickAway={() => setDataEntryMenu(false)}>
					<div className={styles.menu} onClick={() => setDataEntryMenu(false)}>
						<Link to="/clientDataEntry/NewSample">
							<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>Data-Entry New Sample</p>
							</div>
						</Link>
						
						<Link to="/client/DataEntry/Add_Ons"><div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Add-on Tests</p>
							</div>
						</Link>
						
						<Link to="/client/DataEntry/RepeatSample">
						<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "yellow",fontSize:"17px"}}></i></span>
							<p>Data-Entry RepeatSample</p>
							</div>
						</Link>
						
						</div>

					
							
						
					
				</ClickAwayListener>
			)}

			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{(setPatientReportsMenu(!patientReportsMenu))}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-basket" className={styles.icons} style={{color: "green"}}></i></span>
				<span>Patient Reports</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{patientReportsMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{patientReportsMenu && (
				<ClickAwayListener onClickAway={() => patientReportsMenu(false)}>
					<div className={styles.menu} onClick={() => setPatientReportsMenu(false)}>
						<Link to="/client/PatientReports/NewReports">
							<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>New Reports</p>
							</div>
						</Link>
						
						<Link to="/client/PatientReports/HistoricalReports"><div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Historical Reports</p>
							</div>
						</Link>
						
						</div>

					
							
						
					
				</ClickAwayListener>
			)}

			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setBilling(!billing)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-cash-stack" className={styles.icons} style={{color: "#0090e7"}}></i></span>
				<span>Billing</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{billing ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{billing && (
				<ClickAwayListener onClickAway={() => setBilling(false)}>
					<div className={styles.menu} onClick={() => setBilling(false)}>
						<Link to="/client/Billing/AmountDeposit">
							<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>Add Money</p>
							</div>
						</Link>
						
						<Link to="/client/Billing/transactionDetails"><div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "yellow",fontSize:"17px"}}></i></span>
							<p>Transaction details</p>
							</div>
						</Link>
						
						<Link to="/client/Billing/CostOfSamples">
						<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Costs of Samples</p>
							</div>
						</Link>

						
						</div>
				</ClickAwayListener>
			)}


<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setPrice(!price)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-person-check" className={styles.icons} style={{color: "pink"}}></i></span>
				<span>My Account</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{price ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{price && (
				<ClickAwayListener onClickAway={() => setPrice(false)}>
					<div className={styles.menu} onClick={() => setPrice(false)}>
						<Link to="/client/MyAccount/PriceList">
							<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>My price List</p>
							</div>
						</Link>
						
						<Link to="/client/Profile/Edit"><div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "yellow",fontSize:"17px"}}></i></span>
							<p>Edit Profile</p>
							</div>
						</Link>
						
						<Link>
						<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Agreement List</p>
							</div>
						</Link>
					</div>
				</ClickAwayListener>
			)}
            <div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setTrackMenu(!trackMenu)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-geo-alt" className={styles.icons} style={{color: "orange"}}></i></span>
				<span>Sample Tracking</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{trackMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{trackMenu && (
				<ClickAwayListener onClickAway={() => setTrackMenu(false)}>
					<div className={styles.menu} onClick={() => setTrackMenu(false)}>
						<Link to="/client/SampleTracking/TrackSample">
						<div className={styles.options}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "yellow",fontSize:"17px"}}></i></span>
							<p>Track Sample</p>
							</div>
						</Link>
						</div>
					
				</ClickAwayListener>
			)}
			<Link to="/client/query" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-speedometer2" className={styles.icons}  style={{color: "#8f5fe8"}}></i></span>
				<span>Query</span>
			</div>
			</Link>
			

			
			<NavLink
				to="/collection/patients"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-database-add" className={styles.icons} style={{color: "#ffab00"}}></i></span>
				<span>Add Location</span>
				<span style={{marginLeft:"80px"}}><i class="bi bi-chevron-down"></i></span>
			</NavLink>
			<div
				className={styles.create_playlist_btn}
				
			>
				<AddIcon />
				<Link to="/clientDataEntry/NewSample">
				<span>Booking</span></Link>
			</div>
			<div className={styles.underline}></div>
		</div>
	);
};

export default Sidebar;
