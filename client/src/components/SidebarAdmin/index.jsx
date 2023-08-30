import { useState} from "react";
import { NavLink,useHistory, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { ClickAwayListener } from "@mui/material";
import "./style.css"
import logo from "../../img/images/ICClogo.png"
import SearchIcon from "@mui/icons-material/Search";

import styles from "./styles.module.scss";


const Sidebar = ({ handleComponentClick }) => {
	
	const { user } = useSelector((state) => state.auth);


	const [dataEntryMenu, setDataEntryMenu] = useState(false);
	const [directPatient, setDirectPatient] = useState(false);
	const [patientReportsMenu,setPatientReportsMenu]= useState(false)
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
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-basket" className={styles.icons} style={{color: "green"}}></i></span>
				<span>Upload GC points</span>
			</div>
			</Link>
			<Link to="/admin/blog" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
			> 
				<span className={styles.side}></span>
				<span className={styles.menu_icon}><i class="bi bi-basket" className={styles.icons} style={{color: "green"}}></i></span>
				<span>Upload Blog</span>
			</div>
			</Link>
			<Link to="/admin/Allblog" ><div
				activeClassName={styles.active_menu}
				className={styles.menu_link}
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
