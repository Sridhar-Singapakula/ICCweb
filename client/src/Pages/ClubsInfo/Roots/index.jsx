import React from 'react';
import TimelineComponent from '../../../components/Timeline';
import Navbar from "../../../components/Navbar"
import roots from "../../../img/images/roots.png";
import "./style.css";
import gsec from "../../../img/images/gsec.jpg";
import ICClogo from "../../../img/images/ICClogo.png"
const Roots = () => {
  const eventsData = [
    {
      date: 'May 21',
      time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Roots',
      description:
        'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
        date: 'May 21',
        time: '7:45 PM',
        color: 'fb',
        icon: 'fa fa-map-marker',
        eventName: 'Roots',
        description:
          'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
        tags: ['Design', 'Admin'],
      },
      {
        date: 'May 21',
        time: '7:45 PM',
        color: 'fb',
        icon: 'fa fa-map-marker',
        eventName: 'Roots',
        description:
          'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
        tags: ['Design', 'Admin'],
      },
      {
        date: 'May 21',
        time: '7:45 PM',
        color: 'fb',
        icon: 'fa fa-map-marker',
        eventName: 'Roots',
        description:
          'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
        tags: ['Design', 'Admin'],
      }
    // Add more events here...
  ];

  return (
    <div>
        <Navbar/>

        <div className="section-title" style={{marginTop:"100px",marginBottom:"-50px"}}>
          <h2>Roots Club</h2>
        </div>
        <div>
        <ul className='ul_'>
          <li className='li_'>
            <a href="#">
             <i className="bi bi-linkedin" aria-hidden="true"></i>
              <span> - @roots_iitb</span>
            </a>
          </li>
          <li className='li_'>
            <a href="#">
              <i className="bi bi-twitter" aria-hidden="true"></i>
              <span> - @roots_iitb</span>
            </a>
          </li>
          <li className='li_'>
            <a href="#">
              <i className="bi bi-instagram" aria-hidden="true"></i>
              <span> - @roots_iitb</span>
            </a>
          </li>
          </ul>
        </div>
      <section id="why-us" className="why-us section-bg">
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
        <div className="col-lg-4 align-items-stretch order-1 order-lg-2 img"  data-aos="zoom-in" data-aos-delay="150">
            <img src={roots} className="image_back"></img>
          </div>
          <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1" style={{alignItems:"start"}}>
            <div className="content">
              <h3 style={{fontSize:"30px",}} ><strong>Institute Classical and folk Arts Club</strong></h3>
              <p>
               Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aliquam hic deleniti, nostrum, adipisci natus unde exercitationem nulla at placeat esse repellat molestias atque veritatis officiis voluptatibus vitae maiores consectetur adipisicing elit. Sed aliquam hic deleniti, nostrum, adipisci natus unde exercitationem nulla at
              </p>
            </div>
            <div className='club_info' style={{display:"flex",marginTop:"20px",alignItems:"center"}}>
              <div>
              <img className='secy' src={gsec}></img></div>  
              <div style={{marginLeft:"30px"}}>
                <h3 style={{fontSize:"24px"}}>
                    Pranali 
                </h3>
                <p style={{fontSize:"18px",color:"grey"}}>
                Institute Classical and folk Arts Club Secretary
                </p>
                <div className="social-links mt-3">
                <a href="#" className="twitter"><i className="bi bi-twitter" style={{fontSize:"25px",color:"lightblue"}}></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook" style={{fontSize:"25px",color:"lightblue",marginLeft:"5px"}}></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram" style={{fontSize:"25px",color:"lightblue",marginLeft:"5px"}}></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin" style={{fontSize:"25px",color:"lightblue",marginLeft:"5px"}}></i></a>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
    <h1 style={{fontSize:"30px",fontStyle:"bolder",textAlign:"center"}}><strong>Events Timeline</strong></h1>
      <TimelineComponent events={eventsData} />
      <footer id="footer" className="footer">
      

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
  );
};

export default Roots;