import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import AOS from 'aos';
import { useEffect,useState } from 'react';
import ICClogo from "../../img/images/ICClogo.png";


const Navbar = () => {
	const [menu, setMenu] = useState(false);

	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); 

    const handleMobileNavToggle = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };
    const handleNavLinkClick = () => {
      setIsMobileNavOpen(false);
    };
    const sliderSettings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000, // Set the interval between slides (in milliseconds)
      };
      useEffect(() => {
        AOS.init();
        
      }, []);

	return (
	<header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" style={{ display: "flex" }}>
          <div>
          <a href="/" className="logo me-auto">
            <img src={ICClogo} alt="" />
          </a>
          </div>         
        </Link>

        <nav id="navbar" className={`navbar order-last order-lg-0 ${isMobileNavOpen ? 'mobile-nav-open' : ''}`}>
          
          <ul>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto active" href="/">Home</a></li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="/GC">GC</a></li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="#services">Clubs</a></li>
            
            <li onClick={handleNavLinkClick} >
              <a href="/team">
                <span>Team</span> 
              </a>
            </li>
            <li onClick={handleNavLinkClick}><a className="nav-link scrollto" href="#contact">Contact</a></li>
            <Link to="/blogs" onClick={handleNavLinkClick}><li><a className="nav-link scrollto" href="/blogs">Blogs</a></li></Link>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" onClick={handleMobileNavToggle} ></i>
        </nav>
      </div>
    </header>
	);
};

export default Navbar;
