import React from 'react';
import TimelineComponent from '../../../components/Timeline';
import Navbar from "../../../components/Navbar"
// import film from "../../../img/images/film.png";
import "./style.css";
import gsec from "../../../img/images/gsec.jpg";
import ICClogo from "../../../img/images/ICClogo.png";
import pngi from "../../../img/images/pngi.png";
const FourthWall = () => {
  const eventsData = [
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'TheatreFest',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'AnnProd',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Sophie Prod',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Main Dramatics General Championship',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Street Play General Championship',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Workshops',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Lukkha Sessions',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Writers Meet ',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    }

   
  ];

  return (
    <div>
        <Navbar/>

        <div className="section-title" style={{marginTop:"100px",marginBottom:"-50px"}}>
          <h2>The Dramatics Club of IIT Bombay </h2>
        </div>
        <div>
        <ul className='ul_'>
          {/* <li className='li_'>
            <a href="https://www.linkedin.com/company/comedy-cons/">
             <i className="bi bi-linkedin" aria-hidden="true"></i>
              <span> - @silver-screen_iitb</span>
            </a>
          </li> */}
          <li className='li_'>
            <a href="https://www.facebook.com/groups/fourthwall">
              <i className="bi bi-facebook" aria-hidden="true"></i>
              <span> - @fourthwall_iitb</span>
            </a>
          </li>
          <li className='li_'>
            <a href="https://www.youtube.com/c/FourthwallIITB">
              <i className="bi bi-youtube" aria-hidden="true"></i>
              <span> - @fourthwall_iitb</span>
            </a>
          </li>
          <li className='li_'>
            <a href="instagram.com/fourthwall_iitbombay/">
              <i className="bi bi-instagram" aria-hidden="true"></i>
              <span> - @fourthwall_iitb</span>
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
              <h3 style={{fontSize:"30px",}} ><strong>The Dramatics Club of IIT Bombay </strong></h3>
              <img src={{pngi}} width="200" height="150"></img>
              <img src={{pngi}} width="200" height="150"></img>
              <p>
              "All the world’s a stage, And all the men and women merely players, They have their exits and their entrances, And one man in his time plays many parts. - William Shakespeare.।" 

FourthWall is one of the oldest cultural clubs of IIT Bombay. The club derives its name from a literal term used by theatre professionals - ‘Fourthwall’ meaning a performance convention in which an invisible, imaginary wall separates actors from the audience. We give the opportunity to act, direct and write theatre. The dramatics genres practiced here are street plays, stage plays, mono act, mime, etc. 

Anyone can become a part of the club and can improve his/her skills by participating in the various events organized by our club. You can also learn some technical aspects of theatre like light handling and sound mixing. Apart from the technicalities and learning, people join FourthWall to have fun, go on outings and establish networks with the influential people out here in IIT Bombay. 

IIT Bombay’s FourthWall is renowned in the theatre community. We have been participating in inter-college competitions, and consistently winning at Inter IIT Cultural Meet. We have had alumni who now work at TVF as well. Come join us at the theatre room in Old SAC!       

 

              </p>
            </div>
            <div className='club_info' style={{display:"flex",marginTop:"20px",alignItems:"center"}}>
              <div>
              <img className='secy' src={{pngi}}></img></div>  
              <div style={{marginLeft:"30px"}}>
                <h3 style={{fontSize:"24px"}}>
                Dayashankar
                </h3>
                <p style={{fontSize:"18px",color:"grey"}}>
                Institute Dramatics Secretary
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

export default FourthWall;