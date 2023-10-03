import React from 'react';
import TimelineComponent from '../../../components/Timeline';
import Navbar from "../../../components/Navbar"
// import film from "../../../img/images/film.png";
import "./style.css";
import gsec from "../../../img/images/gsec.jpg";
import ICClogo from "../../../img/images/ICClogo.png";
import pngi from "../../../img/images/pngi.png";
const WeSpeak = () => {
  const eventsData = [
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Union Debate',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Sophie Films ',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'The IIT Bombay Debate  ',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Brave NewWorld',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Pro-Am Tournament',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Freshmen Debate Open',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'TalkMasters',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    }

   
  ];

  return (
    <div>
        <Navbar/>

        <div className="section-title" style={{marginTop:"100px",marginBottom:"-50px"}}>
          <h2>The Debating Club of IIT Bombay </h2>
        </div>
        <div>
        <ul className='ul_'>
          {/* <li className='li_'>
            <a href="https://www.linkedin.com/company/comedy-cons/">
             <i className="bi bi-linkedin" aria-hidden="true"></i>
              <span> - @wespeak_iitb</span>
            </a>
          </li> */}
          <li className='li_'>
            <a href="https://m.youtube.com/channel/UC7jUlINU6-3SiMnMvFtDXIw">
              <i className="bi bi-youtube" aria-hidden="true"></i>
              <span> - @wespeak_iitb</span>
            </a>
          </li>
          <li className='li_'>
            <a href="https://www.instagram.com/silverscreen_iitb/">
              <i className="bi bi-instagram" aria-hidden="true"></i>
              <span> - @wespeak_iitb</span>
            </a>
          </li>
          </ul>
        </div>
      <section id="why-us" className="why-us section-bg">
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
        <div className="col-lg-4 align-items-stretch order-1 order-lg-2 img"  data-aos="zoom-in" data-aos-delay="150">
            <img src={{pngi}}className="image_back"></img>
          </div>
          <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1" style={{alignItems:"start"}}>
            <div className="content">
              <h3 style={{fontSize:"30px",}} ><strong>The Debating Club of IIT Bombay  </strong></h3>
    
              <p>
              The Speaking Arts genre works through two clubs in IIT-Bombay namely We Speak and Comedy Cons. Both Clubs bring together people who want to pursue activities like
Debates, Model United Nations (MUN), Group Discussion, Extempore, Stand-up comedy, etc. It has a niche for everyone, people who like to logically build up their arguments, discuss socio-economic issues, and forge charters to people who would like to just sit back and have a good laugh. It helps one grow as a person by discussing a vast range of issues from a global crisis to mundane arguments, voicing your opinions, respecting others' points of view, or even just listening to what other people have to say. This is also the place where you get an audience to your funny streak and the place where you can just sit, laugh, and relax. 
 
 

              </p>
            </div>
            <div className='club_info' style={{display:"flex",marginTop:"20px",alignItems:"center"}}>
              <div>
              <img className='secy' src={{pngi}}></img></div>  
              <div style={{marginLeft:"30px"}}>
                <h3 style={{fontSize:"24px"}}>
                Gautam Khona
                </h3>
                <p style={{fontSize:"18px",color:"grey"}}>
                Institute Speaking Arts Secretary
                </p>
                <div className="social-links mt-3">
                <a href="https://www.bing.com/ck/a?!&&p=3cebb74a25496998JmltdHM9MTY5Mzk1ODQwMCZpZ3VpZD0zZDNkZTIxMy1iOGEyLTYwZmQtMWVkZS1mMDIyYjlhNDYxOGEmaW5zaWQ9NTIxNg&ptn=3&hsh=3&fclid=3d3de213-b8a2-60fd-1ede-f022b9a4618a&psq=twitter+institute+cultural+council+iitb&u=a1aHR0cHM6Ly90d2l0dGVyLmNvbS9DdWx0X0lJVEI&ntb=1" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="https://www.bing.com/ck/a?!&&p=e226db4156f9ceccJmltdHM9MTY5Mzk1ODQwMCZpZ3VpZD0zZDNkZTIxMy1iOGEyLTYwZmQtMWVkZS1mMDIyYjlhNDYxOGEmaW5zaWQ9NTIwMw&ptn=3&hsh=3&fclid=3d3de213-b8a2-60fd-1ede-f022b9a4618a&psq=facebook+institute+cultural+council+iitb&u=a1aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0lJVEJDdWx0Lw&ntb=1" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="https://www.bing.com/ck/a?!&&p=270cf863139e3790JmltdHM9MTY5Mzk1ODQwMCZpZ3VpZD0zZDNkZTIxMy1iOGEyLTYwZmQtMWVkZS1mMDIyYjlhNDYxOGEmaW5zaWQ9NTIxMg&ptn=3&hsh=3&fclid=3d3de213-b8a2-60fd-1ede-f022b9a4618a&psq=instagram+institute+cultural+council+iitb&u=a1aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9jdWx0dXJhbHMuaWl0Yi8&ntb=1" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/company/culturals-iit-bombay/" className="linkedin"><i className="bi bi-linkedin"></i></a>
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
                <a href="https://www.bing.com/ck/a?!&&p=3cebb74a25496998JmltdHM9MTY5Mzk1ODQwMCZpZ3VpZD0zZDNkZTIxMy1iOGEyLTYwZmQtMWVkZS1mMDIyYjlhNDYxOGEmaW5zaWQ9NTIxNg&ptn=3&hsh=3&fclid=3d3de213-b8a2-60fd-1ede-f022b9a4618a&psq=twitter+institute+cultural+council+iitb&u=a1aHR0cHM6Ly90d2l0dGVyLmNvbS9DdWx0X0lJVEI&ntb=1" className="twitter"><i className="bi bi-twitter"></i></a>
                <a href="https://www.bing.com/ck/a?!&&p=e226db4156f9ceccJmltdHM9MTY5Mzk1ODQwMCZpZ3VpZD0zZDNkZTIxMy1iOGEyLTYwZmQtMWVkZS1mMDIyYjlhNDYxOGEmaW5zaWQ9NTIwMw&ptn=3&hsh=3&fclid=3d3de213-b8a2-60fd-1ede-f022b9a4618a&psq=facebook+institute+cultural+council+iitb&u=a1aHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL0lJVEJDdWx0Lw&ntb=1" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="https://www.bing.com/ck/a?!&&p=270cf863139e3790JmltdHM9MTY5Mzk1ODQwMCZpZ3VpZD0zZDNkZTIxMy1iOGEyLTYwZmQtMWVkZS1mMDIyYjlhNDYxOGEmaW5zaWQ9NTIxMg&ptn=3&hsh=3&fclid=3d3de213-b8a2-60fd-1ede-f022b9a4618a&psq=instagram+institute+cultural+council+iitb&u=a1aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9jdWx0dXJhbHMuaWl0Yi8&ntb=1" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="https://www.linkedin.com/company/culturals-iit-bombay/" className="linkedin"><i className="bi bi-linkedin"></i></a>
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

export default WeSpeak;