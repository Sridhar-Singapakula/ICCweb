import React from 'react';
import TimelineComponent from '../../../components/Timeline';
import Navbar from "../../../components/Navbar"
// import Design from "../../../img/images/Design.png";
import "./style.css";
import gsec from "../../../img/images/gsec.jpg";
import ICClogo from "../../../img/images/ICClogo.png";
import pngi from "../../../img/images/pngi.png";
const Design = () => {
  const eventsData = [
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: ' Vision : The Design Festival of IIT Bombay ',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Photoshop 101',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Illustrator 101',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Design General Championship',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Mastertalks',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'UI/UX',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Branding',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Animation',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: '3D Workshops',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    },
    {
      // date: 'May 21',
      // time: '7:45 PM',
      color: 'fb',
      icon: 'fa fa-map-marker',
      eventName: 'Lukkha sessions',
      // description:
      //   'Milestone Admin Dashboard contains C3 graphs, flot graphs, data tables, calendar, drag & drop and ion slider.',
      tags: ['Design', 'Admin'],
    }

   
  ];

  return (
    <div>
        <Navbar/>

        <div className="section-title" style={{marginTop:"100px",marginBottom:"-50px"}}>
          <h2>The Design Club</h2>
        </div>
        <div>
        <ul className='ul_'>
          <li className='li_'>
            <a href="https://www.linkedin.com/company/the-design-club-iit-bombay/">
             <i className="bi bi-linkedin" aria-hidden="true"></i>
              <span> - @design-club_iitb</span>
            </a>
          </li>
          <li className='li_'>
            <a href="https://www.facebook.com/thedesignclubiitb">
              <i className="bi bi-facebook" aria-hidden="true"></i>
              <span> - @design-club_iitb</span>
            </a>
          </li>
          <li className='li_'>
            <a href="https://www.instagram.com/designiitb/">
              <i className="bi bi-instagram" aria-hidden="true"></i>
              <span> - @design-club_iitb</span>
            </a>
          </li>
          <li className='li_'>
            <a href="https://www.youtube.com/channel/UCT-H_0-ai4YaReSqboTiXPA">
              <i className="bi bi-instagram" aria-hidden="true"></i>
              <span> - @design-club_iitb</span>
            </a>
          </li>

          </ul>
        </div>
      <section id="why-us" className="why-us section-bg">
      <div className="container-fluid" data-aos="fade-up">
        <div className="row">
        <div className="col-lg-4 align-items-stretch order-1 order-lg-2 img"  data-aos="zoom-in" data-aos-delay="150">
            <img src="../../../img/images/silverscreen.png"className="image_back"></img>
          </div>
          <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch order-2 order-lg-1" style={{alignItems:"start"}}>
            <div className="content">
              <h3 style={{fontSize:"30px",}} ><strong>The Film and Media Club of IIT Bombay </strong></h3>
              
              <img src="../../../img/images/designclub.png" width="200" height="150"></img>
              <img src="../../../img/images/designpic.png" width="200" height="150"></img>
              <img src="../../../img/images/designpic1.png" width="200" height="150"></img>
              <p>
              "Design can be art. Design can be aesthetics. Design is so simple, that's why it is so complicated." - Paul Rand

As we at The Design Club like to say, 'Get High on Creativity!' Put your crazy artistic thoughts into manifesting the designer in you. Spanning genres from graphic design, animation, and character design to UI/UX, 3D and branding: whatever your pick is, we've got you covered. 
We conduct a range of workshops for your learning of these genres, software like Photoshop, Illustrator, Figma etc., and talks by designers so that you get an in-depth understanding of what it all really is and what waits for you out there in the field and of course lukkha sessions where you chill out and have fun with a touch of dabbling in designing with your friends.
Our flagship event is Vision: The Design Festival of IIT Bombay, with month-long projects executed by you guys with a lot of fun and working and learning together showcased in a mesmerising showcase at the end. Installations that make people want to take a second look, an ambience that you'll remember forever and MasterTalks by leading artists in the fields are just the surface of the experience you'll have. 
Now we're going to have you experience the competitive arena. We bring you competitions in Freshiezza exclusively and the Design GC, where hostels battle out in aesthetics. 
Hands-on workshops, sessions, and interaction with our beloved seniors who are here to pass on the 'gyaan' to take over the world, and treats are just a cherry on top.  

So let's embark on our journey together that'll create enough memories to last a lifetime!
 
 

              </p>
            </div>
            <div className='club_info' style={{display:"flex",marginTop:"20px",alignItems:"center"}}>
              <div>
              <img className='secy' src="./../../img/images/rhythm.png"></img></div>  
              <div style={{marginLeft:"30px"}}>
                <h3 style={{fontSize:"24px"}}>
                Rhythm Ranasaria
                </h3>
                <p style={{fontSize:"18px",color:"grey"}}>
                Institute Design Secretary 
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

export default Design;