import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import "./style.css";
import Sidebar from "../../components/Sidebar";

import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/images/ICClogo.png";


const ClientDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [isSidebarOpen, setIsSidebarOpen] = useState(isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 700;
      setIsMobile(mobile);
      
      if (!mobile) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="dashboard_container">
      <Navbar />

      <div className="client_cont">
        {isMobile ? (
          <>
            <div className={`sidebar_container ${isSidebarOpen ? "open" : ""}`}>
              <Sidebar onClick={handleSidebarClick} />
            </div>
            {/* <div className={`client_area mobile ${isSidebarOpen ? "sidebar-open" : ""}`}>
              <AppRoutes />
            </div> */}
            <div className="toggle_button" onClick={handleToggleSidebar}>
              <i className="bi bi-border-width"></i>
            </div>
          </>
        ) : (
          <>
            <div className="sidebar_container open">
              <Sidebar onClick={handleSidebarClick} />
            </div>
            {/* <div className="client_area">
              <AppRoutes />
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
