import { useState} from "react";
import { NavLink,useHistory, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { ClickAwayListener } from "@mui/material";
import "./style.css"
import logo from "../../img/images/logo.png"
import SearchIcon from "@mui/icons-material/Search";

import styles from "./styles.module.scss";


const Sidebar = ({ handleComponentClick }) => {
	
	const { user } = useSelector((state) => state.auth);


	const [dataEntryMenu, setDataEntryMenu] = useState(false);
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
				<span className={styles.menu_icon}><i class="bi bi-database-add" className={styles.icons} style={{color: "#ffab00"}}></i></span>
				<span>Home</span>
			</div>
			</Link>
			<Link to="/admin/GCPoints" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-basket" className={styles.icons} style={{color: "green"}}></i></span>
				<span>Upload GC points</span>
			</div>
			</Link>
			
			<Link to="/admin/event" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-basket" className={styles.icons} style={{color: "green"}}></i></span>
				<span>Add Announcement</span>
			</div>
			</Link>
			<Link to="/admin/Allevent" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-person-check" className={styles.icons} style={{color: "pink"}}></i></span>
				<span>All Announcements</span>
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
				onClick={()=>{setDataEntryMenu(!dataEntryMenu)}}
				
			> 
				<span className={styles.side}></span>				
				<span className={styles.menu_icon}><i class="bi bi-database-add" className={styles.icons} style={{color: "#ffab00"}}></i></span>
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
			<Link to="/admin/GCFinalResults" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
				onClick={handleComponentClick}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-person-check" className={styles.icons} style={{color: "pink"}}></i></span>
				<span>Declare GCFinalResults</span>
			</div>
			</Link>
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
