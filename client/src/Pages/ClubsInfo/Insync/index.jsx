import React from 'react';
import { useState,useEffect } from 'react';
import TimelineComponent from '../../../components/Timeline';
import Navbar from "../../../components/Navbar"
// import roots from "../../../img/images/roots.png";
import "./style.css";
import gsec from "../../../img/images/gsec.jpg";
import ICClogo from "../../../img/images/ICClogo.png";
import pngi from "../../../img/images/pngi.png";
import dance from "../../../img/images/InSyncClub.png";
import events1 from "../../../img/images/dance_2.jpg";
import events2 from "../../../img/images/dance_3.webp";
import events3 from "../../../img/images/dance_1.jpg";
import Web from "../../../img/images/Sridhar.jpg";
import Aditi from "../../../img/images/Aidti.jfif";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
const Insync = () => {
  const [showAdditionalEvents, setShowAdditionalEvents] = useState(false);
  
  const handleLoadMore = () => {
    setShowAdditionalEvents(!showAdditionalEvents);
  };
  const settings = {
    dots: true,
    autoplay: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 4000,// Use afterChange to trigger handleActive after the slide changes
  };
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
        <Navbar/>
        <div className='cover_img'>
          <h1 className='cover_h4'>
            Insync
          </h1>
        </div>
        <div className='ind_div'>
          <div className='ind_head'>
            <h4 className='ind_head_h4'>
              The Dance Club of IITB
            </h4>
            <p className='ind_head_p'>
Explore the rich tapestry of creativity and talent<br/> of IIT Bombay as we present a spectacular<br/> showcase of cultural events and performances.
            </p>
            <section className="secy">
      <div className="secy-divs">
        <div className="secy-div">
          <img src={Web} className=""></img>
        </div>
        <div>
          <h4 className='about_us_h4'>Sridhar Singapakula</h4>
          <p>Institute Web Nominee</p>
          <div className="links">
          <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          <a href="#" className="email"><i className="bi bi-envelope"></i></a>
          <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
          
          </div>
        </div>
      </div>
     
    </section>
          </div>
          <div className='ind_img'>
            <img src={dance}></img>
          </div>
        </div>
        <div className='events_'>
          <h4 className='about_us_h4 text-center' >Events</h4>
          <div className='events_divs'>
          <div className='events_div'>
            <div>
              <img src={events1}></img>
            </div>
            <div className='events_1_div'>
              <div style={{textAlign:"center"}}>
                <h4 className='h4_'>APR <br/> <span style={{fontSize:"25px",fontWeight:"700",color:"black"}}>14</span></h4>
              </div>
              <div className='events_desc'>
                <h4>
                  Event name
                </h4>
                <h4>
                  Venue
                </h4>
                <p>
                  Description about the event
                </p>
              </div>
            </div>
          </div>
          <div className='events_div'>
            <div>
              <img src={events2}></img>
            </div>
            <div className='events_1_div'>
              <div style={{textAlign:"center"}}>
                <h4 className='h4_'>APR <br/> <span style={{fontSize:"25px",fontWeight:"700",color:"black"}}>14</span></h4>
              </div>
              <div className='events_desc'>
                <h4>
                  Event name
                </h4>
                <h4>
                  Venue
                </h4>
                <p>
                  Description about the event
                </p>
              </div>
            </div>
          </div>
          <div className='events_div'>
            <div>
              <img src={events1}></img>
            </div>
            <div className='events_1_div'>
              <div style={{textAlign:"center"}}>
                <h4 className='h4_'>APR <br/> <span style={{fontSize:"25px",fontWeight:"700",color:"black"}}>14</span></h4>
              </div>
              <div className='events_desc'>
                <h4>
                  Event name
                </h4>
                <h4>
                  Venue
                </h4>
                <p>
                  Description about the event
                </p>
              </div>
            </div>
          </div>
          {showAdditionalEvents &&
          <>
          <div className='events_div'>
            <div>
              <img src={events3}></img>
            </div>
            <div className='events_1_div'>
              <div style={{textAlign:"center"}}>
                <h4 className='h4_'>APR <br/> <span style={{fontSize:"25px",fontWeight:"700",color:"black"}}>14</span></h4>
              </div>
              <div className='events_desc'>
                <h4>
                  Event name
                </h4>
                <h4>
                  Venue
                </h4>
                <p>
                  Description about the event
                </p>
              </div>
            </div>
          </div>
          <div className='events_div'>
            <div>
              <img src={events3}></img>
            </div>
            <div className='events_1_div'>
              <div style={{textAlign:"center"}}>
                <h4 className='h4_'>APR <br/> <span style={{fontSize:"25px",fontWeight:"700",color:"black"}}>14</span></h4>
              </div>
              <div className='events_desc'>
                <h4>
                  Event name
                </h4>
                <h4>
                  Venue
                </h4>
                <p>
                  Description about the event
                </p>
              </div>
            </div>
          </div>
          </>
          }
        </div>
        <div className='text-center'>
          <button className="button-34 text-center" onClick={handleLoadMore}>Load More</button>
        </div>
        <div className='achievements'>
          <h4 className='about_us_h4 text-center'>Achievements</h4>
          <div className='achieve_divs'>
            <div>
              <img src={events1} className='carousel_img'></img>
              <h4 className='position text-center'>1st Position</h4>
              <p className='text-center'>Description</p>
            </div>
            <div>
            <img src={events2} className='carousel_img c1'></img>
            <h4 className='position text-center'>1st Position</h4>
              <p className='text-center'>Description</p>
            </div>
            <div>
            <img src={events3} className='carousel_img'></img>
            <h4 className='position text-center'>1st Position</h4>
              <p className='text-center'>Description</p>
            </div>
          </div>
        </div>
      </div>
      <div className='gallery_divs'>
        <h4 className='about_us_h4 text-center '>Photo Gallery</h4>
        <Slider {...settings}>
          <div className='gallery_'>
            <img src={events1} ></img>
          </div>
          <div className='gallery_'>
            <img src={events2}></img>
          </div>
          <div className='gallery_'>
            <img src={events3}></img>
          </div>
        </Slider>
      </div>
      <div className='events_'>
          <h4 className='about_us_h4 text-center' style={{marginBottom:"50px"}}>Events</h4>
          <div className='events_divs'>
          <div className='events_div'>
            <div>
              <img src={events1}></img>
            </div>
            <div className='events_1_div'>
              <div style={{textAlign:"center"}}>
                <h4 className='h4_'>APR <br/> <span style={{fontSize:"25px",fontWeight:"700",color:"black"}}>14</span></h4>
              </div>
              <div className='events_desc'>
                <h4>
                  Event name
                </h4>
                <h4>
                  Venue
                </h4>
                <p>
                  Description about the event
                </p>
              </div>
            </div>
          </div>
          <div className='events_div'>
            <div>
              <img src={events2}></img>
            </div>
            <div className='events_1_div'>
              <div style={{textAlign:"center"}}>
                <h4 className='h4_'>APR <br/> <span style={{fontSize:"25px",fontWeight:"700",color:"black"}}>14</span></h4>
              </div>
              <div className='events_desc'>
                <h4>
                  Event name
                </h4>
                <h4>
                  Venue
                </h4>
                <p>
                  Description about the event
                </p>
              </div>
            </div>
            
          </div>
          <div className='events_div'>
            <div>
              <img src={events1}></img>
            </div>
            <div className='events_1_div'>
              <div style={{textAlign:"center"}}>
                <h4 className='h4_'>APR <br/> <span style={{fontSize:"25px",fontWeight:"700",color:"black"}}>14</span></h4>
              </div>
              <div className='events_desc'>
                <h4>
                  Event name
                </h4>
                <h4>
                  Venue
                </h4>
                <p>
                  Description about the event
                </p>
              </div>
            </div>
          </div>
          </div>
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
              <h4 className="about_us_h4">Contact Us</h4>
              <p className="about_us_p" style={{color:"grey"}}>
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
  );
};

export default Insync;