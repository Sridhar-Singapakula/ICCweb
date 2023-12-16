import { useState} from "react";
import { NavLink,useHistory, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { ClickAwayListener } from "@mui/material";
import "./style.css"
import SearchIcon from "@mui/icons-material/Search";

import styles from "./styles.module.scss";


const Sidebar = ({ handleComponentClick }) => {
	
	const { user } = useSelector((state) => state.auth);


	const [dataEntryMenu, setDataEntryMenu] = useState(false);
	const [AllDataEntryMenu, setAllDataEntryMenu] = useState(false);
	const [FinalResultsMenu, setFinalResultsMenu] = useState(false);
	const [performanceMenu, setPerformanceMenu] = useState(false);
	const [price,setPrice]=useState(false)
	
	return (
		<div className={styles.container}>
			<NavLink
				to="/search"
				className={styles.menu_link}
				activeClassName={styles.active_menu}
			>
				<SearchIcon />
				<span>Search</span>
			</NavLink>
			<Link to="/adminHome" ><div

				activeClassName={styles.active_menu}
				className={styles.menu_link}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-house" className={styles.icons} style={{color: "grey"}}></i></span>
				<span>Home</span>
			</div>
			</Link>
			<Link to="/admin/GCPoints" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-cloud-upload" className={styles.icons} style={{color: "green"}}></i></span>
				<span>Upload GC points</span>
			</div>
			</Link>
			
			<Link to="/admin/event" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-basket" className={styles.icons} style={{color: "red"}}></i></span>
				<span>Add Announcement</span>
			</div>
			</Link>
			
			<Link to="/admin/GCaddparticipants" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-person-check" className={styles.icons} style={{color: "pink"}}></i></span>
				<span>Add GCparticipants</span>
			</div>
			</Link>
			
			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setPerformanceMenu(!performanceMenu)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-bookmarks-fill" className={styles.icons} style={{color: "orange"}}></i></span>
				<span>Performance Rankings</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{performanceMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{performanceMenu && (
				<ClickAwayListener onClickAway={() => setPerformanceMenu(false)}>
					<div className={styles.menu} onClick={() => setPerformanceMenu(false)}>
						<Link to="/admin/GCPerformance">
							<div className={styles.options} onClick={handleComponentClick}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>Individual rankings</p>
							</div>
						</Link>
						
						<Link to="/admin/GroupGCRank"><div className={styles.options} onClick={handleComponentClick}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Group GC Rankings</p>
							</div>
						</Link>
						</div>

					
							
						
					
				</ClickAwayListener>
			)}
			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setDataEntryMenu(!dataEntryMenu)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-people" className={styles.icons} style={{color: "white"}}></i></span>
				<span>Group GC's</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{dataEntryMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{dataEntryMenu && (
				<ClickAwayListener onClickAway={() => setDataEntryMenu(false)}>
					<div className={styles.menu} onClick={() => setDataEntryMenu(false)}>
						<Link to="/admin/GCGroupParticipants">
							<div className={styles.options} onClick={handleComponentClick}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>Group Participants</p>
							</div>
						</Link>
						
						<Link to="/admin/GCGroupResult"><div className={styles.options} onClick={handleComponentClick}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Group GC Result</p>
							</div>
						</Link>
						</div>

					
							
						
					
				</ClickAwayListener>
			)}
			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setAllDataEntryMenu(!AllDataEntryMenu)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-database-add" className={styles.icons} style={{color: "#ffab00"}}></i></span>
				<span>All GC's Data</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{AllDataEntryMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{AllDataEntryMenu && (
				<ClickAwayListener onClickAway={() => setAllDataEntryMenu(false)}>
					<div className={styles.menu} onClick={() => setAllDataEntryMenu(false)}>
						<Link to="/admin/AllData/GCFinalResults">
							<div className={styles.options} onClick={handleComponentClick}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>Final Results</p>
							</div>
						</Link>
						
						<Link to="/admin/Allevent"><div className={styles.options} onClick={handleComponentClick}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>All Announcements</p>
							</div>
						</Link>
						</div>

					
							
						
					
				</ClickAwayListener>
			)}
			<div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={()=>{setFinalResultsMenu(!FinalResultsMenu)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-trophy" className={styles.icons} style={{color: "yellow"}}></i></span>
				<span>Declare Final Results</span>
				<span style={{ marginLeft: '80px' }} className={styles.toggle}>
				{FinalResultsMenu ? <i class="bi bi-chevron-up"></i> : <i class="bi bi-chevron-down"></i>}
				</span>
				
			</div>
			{FinalResultsMenu && (
				<ClickAwayListener onClickAway={() => setFinalResultsMenu(false)}>
					<div className={styles.menu} onClick={() => setFinalResultsMenu(false)}>
						<Link to="/admin/GCFinalResults">
							<div className={styles.options} onClick={handleComponentClick}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "green",fontSize:"17px"}}></i></span>
							<p>Final Results with participants</p>
							</div>
						</Link>
						
						<Link to="/admin/GCFinalResultsNoPart"><div className={styles.options} onClick={handleComponentClick}>
							<span className={styles.menu_icon}><i class="bi bi-circle" className={styles.icons}  style={{color: "pink",fontSize:"17px"}}></i></span>
							<p>Final Results without participants</p>
							</div>
						</Link>
						</div>

					
							
						
					
				</ClickAwayListener>
			)}
			
			
			<Link to="/admin/blog" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-basket" className={styles.icons} style={{color: "green"}}></i></span>
				<span>Upload Blog</span>
			</div>
			</Link>
			<Link to="/admin/Allblog" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-person-check" className={styles.icons} style={{color: "pink"}}></i></span>
				<span>All Blogs</span>
			</div>
			</Link>
			<div className={styles.underline}></div>
		</div>
	);
};
export default Sidebar;
