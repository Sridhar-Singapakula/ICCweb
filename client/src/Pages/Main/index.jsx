import { Link,useHistory} from "react-router-dom";
import React from 'react';
import AOS from 'aos';
import Joi from "joi";
import { useEffect,useState } from 'react';
import {useDispatch} from "react-redux";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import TextField from "../../components/Inputs/TextField";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'boxicons/css/boxicons.min.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'remixicon/fonts/remixicon.css';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import './style.css';


import { Query } from '../../redux/userSlice/apiCalls';



import ICClogo from "../../../src/img/images/ICClogo.png";
import Navbar from "../../components/Navbar";
import dance from "../../../src/img/images/dance.png";
import sing from "../../../src/img/images/sing.png";
import photography from "../../../src/img/images/Photography.png";
import Design from "../../../src/img/images/Design.png";
import roots from "../../../src/img/images/roots.png";
import literature from "../../../src/img/images/Literature.png";
import film from "../../../src/img/images/film.png";
import comedy from "../../../src/img/images/comedy.jfif";
import fashion from "../../../src/img/images/fashion.png";
import main from "../../../src/img/images/main.png";
import RootsLogo from "../../../src/img/images/Roots_black.png";
import FourthWallClub from "../../../src/img/images/FourthWallClub.png";
import SymphonyClub from "../../../src/img/images/SymphonyClub.png";
import InSyncClub from "../../../src/img/images/InSyncClub.png";
import SilverScreenClub from "../../../src/img/images/SilverScreenClub.png";
import ComedyConsClub from "../../../src/img/images/ComedyConsClub.png";
import VaaniClub from "../../../src/img/images/VaaniClub.png";
import StyleUpClub from "../../../src/img/images/StyleUpClub.png";
import WeSpeakClub from "../../../src/img/images/WeSpeakClub.png";
import DesignClub from "../../../src/img/images/DesignClub.png";
import PixelsClub from "../../../src/img/images/PixelsClub.png";
import LiteratiClub from "../../../src/img/images/LiteratiClub.png";







const Main = () => {
  const [data, setData] = useState({
		name: "",
		mobileNumber: "",
		emailId: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleInputState = (name, value) => {
		setData((data) => ({ ...data, [name]: value }));
	};
    const schema = {
        name: Joi.string().allow(""),
        mobileNumber: Joi.string().allow(""),
        emailId: Joi.string().allow(""),
        subject: Joi.string().allow(""),
        message: Joi.string().allow("")}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = { data};
		const res = await Query(payload, dispatch);
		res && history.push("/");
	};

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
        autoplaySpeed: 4000, // Set the interval between slides (in milliseconds)
      };
      useEffect(() => {
        AOS.init();
        
      }, []);

  return (
    <div className="main">
      <Navbar/>
    <section id="hero" className="d-flex align-items-center">
      <div className="container" data-aos="zoom-out" data-aos-delay="100">
        <div className="main_page">
          <div className="col-xl-7 ">
            <h1>Unleashing Creativity:<br/><span className="text" style={{color:"lightyellow"}}>Institute Cultural Council </span></h1>
            <h1 style={{color:"lightblue",fontSize:"25px"}}> IIT Bombay</h1>
            <Link to="/login" className="btn-get-started">Explore</Link>
            <Link to="/Patient" className="btn-buy">Play Video <i className="bi bi-play" ></i></Link>
          </div>
          <div className="col-xl-7">
        <Slider
    dots={true}
    infinite={true}
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    autoplay={true}
    autoplaySpeed={2000}
  >
   
    
    <div>
      <img src={dance} className="img-fluid" alt="" />
    </div>
    <div>
      <img src={sing} className="img-fluid" alt="" />
    </div>
    <div>
      <img src={photography} className="img-fluid" alt="" />
    </div>
    <div>
      <img src={roots} className="img-fluid" alt="" />
    </div>
    <div>
      <img src={Design} className="img-fluid" alt="" />
    </div>
    <div>
      <img src={literature} className="img-fluid" alt="" />
    </div>
    <div>
      <img src={film} className="img-fluid" alt="" />
    </div>
    <div>
      <img src={comedy} className="img-fluid" alt="" />
    </div>
    <div>
      <img src={fashion} className="img-fluid" alt="" />
    </div>
    
  </Slider>
        </div>
        </div>
        
        
      </div>
    </section>

  <div id="main">
  <section  className="about" >
      <div className="container" data-aos="fade-up">
        <div className="row gx-0">

          <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
            <img src={main} className="img-fluid" alt="" />
          </div>
          <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <div className="card" style={{color:"black",padding:"25px"}}>
              <h3 style={{fontSize:"30px",fontStyle:"bolder",fontWeight:"1000"}}>Who We Are</h3>
              <h2 style={{fontSize:"20px",fontWeight:"700"}}>Creating Opportunities for Artistic Expression and Cultural Exchange</h2>
              <p style={{fontSize:"14px",color:"grey"}}>
                At the Institute Cultural Council, we are committed to fostering creativity, diversity, and community through our 13 clubs, each dedicated to a different form of artistic expression. Our clubs include photography, dramatics, dance, singing, literature, design, and more.
                Our mission is to provide a platform for students to explore their passions and develop their talents, while also promoting collaboration, inclusivity, and cultural exchange.
              </p>
              
            </div>
            <div class="blob"></div>
          </div>
         

        </div>
       
      </div>
    </section>
    <section id="services" className="services section-bg ">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Clubs</h2>
          {/* <p style={{fontSize:"14px"}}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum natus saepe, totam esse sit numquam doloremque iusto illo quia corporis aut enim, unde repellendus <br/></p> */}
        </div>
        
        <div className="row">
        
          <div className="col-md-6">
          
          <div class="blob"></div>
          <a href="/roots">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={RootsLogo} className="logo_img"></img>
              </div>
              <div>
              <h4>Roots Club<a href=""></a></h4>
              <p>The Classical and Folk Arts Club of IIT Bombay </p>
              </div>
              
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/fourthwall">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={FourthWallClub} className="logo_img"></img>
              </div>
              <div>
              <h4>FourthWall <a href=""></a></h4>
              <p>The Dramatics Club of IIT Bombay </p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/insync">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={InSyncClub} className="logo_img"></img>
              </div>
              <div>
              <h4>InSync <a href=""></a></h4>
              <p>The Dance Club of IIT Bombay</p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/symphony">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={SymphonyClub} className="logo_img" ></img>
              </div>
              <div>
              <h4>Symphony<a href=""></a></h4>
              <p>The Music Club of IIT Bombay </p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/wespeak">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={WeSpeakClub} className="logo_img" ></img>
              </div>
              <div>
              <h4>WeSpeak <a href=""></a></h4>
              <p>The Debating Club of IIT Bombay </p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/comedycons">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={ComedyConsClub} className="logo_img" style={{width:"120%"}}></img>
              </div>
              <div>
              <h4>ComedyCons<a href=""></a></h4>
              <p>The Comedy Club of IIT Bombay</p>
              </div>
            </div>
            </a>
            
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/styleup">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={StyleUpClub} className="logo_img"></img>
              </div>
              <div>
              <h4>StyleUp <a href=""></a></h4>
              <p>The Fashion Club of IIT Bombay </p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/literati">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={LiteratiClub} className="logo_img"></img>
              </div>
              <div>
              <h4>Literati <a href=""></a></h4>
              <p>The Literary Arts Club of IIT Bombay</p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6">
          <a href="/vaani">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={VaaniClub} className="logo_img"></img>
              </div>
              <div>
              <h4>Vaani  <a href=""></a></h4>
              <p>The Indian Languages Club of IIT Bombay </p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/pixels">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={PixelsClub} className="logo_img"></img>
              </div>
              <div>
              <h4>Rang & Pixels<a href=""></a></h4>
              <p>The Photography and Fine Arts Club of IIT Bombay</p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/silverscreen">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={SilverScreenClub} className="logo_img"></img>
              </div>
              <div>
              <h4>SilverScreen <a href=""></a></h4>
              <p>The Film and Media Club of IIT Bombay</p>
              </div>
            </div>
            </a>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
          <a href="/design">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100" style={{display:"flex"}}>
              <div className="logo_desc" >
                <img src={DesignClub} className="logo_img" ></img>
              </div>
              <div>
              <h4>The Design Club<a href=""></a></h4>
              <p> Design Club of IIT Bombay</p>
              </div>
            </div>
            </a>
          </div>
         
        </div>

      </div>
    </section>

    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Contact</h2>
          <p>Have a Question? Contact Us</p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100" style={{position:"relative",left:"30%"}}>
          <div className="col-lg-6">
          <div class="blob"></div>
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="col form-group">
                      <TextField
						            label="Name"
                        name="name"
						            placeholder="Enter your Name"
                        handleInputState={handleInputState}
                        schema={schema.name}
						            value={data.name}
                        error={errors.name}
                        type="name"
						            style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px', }}
					            />
                </div>
                <div className="col form-group">
                      <TextField
						            label="Mobile Number"
						            placeholder="Enter your Mobile Number"
                        name="mobileNumber"
						            handleInputState={handleInputState}
                        schema={schema.mobileNumber}
						            value={data.mobileNumber}
                        error={errors.mobileNumber}
                        type="mobileNumber"
						            style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
                </div>
                <div className="col form-group">
                      <TextField
						            label="Email Id"
						            placeholder="Enter your Email Id"
                        name="emailId"
						            handleInputState={handleInputState}
                        schema={schema.emailId}
						            value={data.emailId}
                        error={errors.emailId}
                        type="emailId"
						            style={{ width: '150px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
                </div>
              </div>
              <div className="form-group">
                      <TextField
						            label="Subject"
						            placeholder="Subject"
                        name="subject"
						            handleInputState={handleInputState}
                        schema={schema.subject}
						            value={data.subject}
                        error={errors.subject}
                        type="subject"
						            style={{ width: '500px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
              </div>
              <div className="form-group">
              <TextField
						            label="Message?"
						            placeholder="message"
                        name="message"
						            handleInputState={handleInputState}
                        schema={schema.message}
						            value={data.message}
                        error={errors.message}
                        type="message"
						            style={{ width: '500px', fontSize: '12px', padding: '4px', height: '40px' }}
					            />
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>

        </div>
        
      </div>
      
    </section>

  </div>
  <footer id="footer2" className="footer">
      

      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5 col-md-12 footer-info">
              <a href="index.html" className="logo d-flex align-items-center">
                <img src={ICClogo} alt="" />
              </a>
             <div className="social-links mt-3">
                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>

           

            
            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Contact Us</h4>
              <p>
                Old SAC <br />
                IIT Bombay<br />
                Mumbai,India <br /><br />
                <strong>Phone:</strong> +123456789<br />
                <strong>Email:</strong> example@gmail.com<br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>

</div>
  )
}

export default Main
