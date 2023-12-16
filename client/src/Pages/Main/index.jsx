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
import Carousel1 from "./carousel";
import Web from "../../img/images/Sridhar.jpg";
import Aditi from "../../img/images/Aidti.jfif";


import { Query } from '../../redux/userSlice/apiCalls';
import herohead from "../../img/images/hero_head.png";
import idea from "../../img/images/Idea.png";
import diversity from "../../img/images/Done.png";
import community from "../../img/images/Play.png";

import dance_1 from "../../img/images/dance_1.jpg";
import dance_2 from "../../img/images/dance_2.jpg";
import dance_3 from "../../img/images/dance_3.webp";


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
  const images=[
    dance_1,dance_2,dance_3
  ]
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

      useEffect(() => {
        AOS.init();
      }, []);
      
  return (
    <div>
    <Navbar/>
    <section className="main_">
      <div className="hero_heading">
        <h4 className="hero_h4">
          Welcome to a Dazzling Showcase  of Culture and Creativity!
        </h4>
        <p className="hero_p">
          Explore  the rich tapestry of creativity and talent of IIT Bombay as we present a spectacular showcase of cultural events and performances.
        </p>
        <button className="button-30">Explore</button>
      </div>
      <div>
        <img src={herohead} className="hero_img">
        </img>
      </div>
    </section>
    <section>
      <div className="about_us">
        <h4 className="about_us_h4">
          Who are we
        </h4>
        <p className="about_us_p">
        We are the spirited artisans of IIT Bombay, passionate advocates of culture, we weave diverse threads into the vibrant fabric of our community, celebrating the beauty of art in all its forms.
        </p>
      </div>
      <div className="about_us_1">
        <div className="about_us_divs">
          <img src={idea} className="about_us_img">
          </img>
          <h4>
            Creativity
          </h4>
          <p >
          At the intersection of imagination and fun, we craft creations that light up our world.
          </p>
        </div>
        <div className="about_us_divs">
        <img src={diversity} className="about_us_img">
          </img>
          <h4>
          Diversity
          </h4>
          <p >
          Like a vibrant mosaic, we celebrates the delightful patchwork of cultures.
          </p>

        </div>
        <div className="about_us_divs">
        <img src={community} className="about_us_img">
          </img>
          <h4>
          Community
          </h4>
          <p >
          Together, we embark on a journey, where our love for creativity forms the community.
          </p>

        </div>

      </div>
      <div>
      </div>
    </section>
    <section className="photo_gallery">
      <h4 className="about_us_h4">Photo Gallery</h4>
      <Carousel1 images={images}/>
    </section>
    <section className="clubs">
    <h4 className="about_us_h4">Clubs</h4>
    
    <div className="clubs_1">
      <a href="/insync">

      <div className="club_divs">
      <div className="club_img_div">
        <img src={InSyncClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            Insync-The Dance Club
          </h4>
        </div>
      </div>
      </a>
     
      <div className="club_divs">
      <div className="club_img_div">
        <img src={SymphonyClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            Symphony-The Music Club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={RootsLogo} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            Roots
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={FourthWallClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            FourthWall-The Dramatic Club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={VaaniClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            Vaani-Indian languages club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={SilverScreenClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            SilverScreen-The Film Club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={StyleUpClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
           StyleUp-Fashion Club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={ComedyConsClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            ComedyCons-Humor Club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={WeSpeakClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            WeSpeak-Debate club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={LiteratiClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            Literati-Literary arts Club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={DesignClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            The Design Club
          </h4>
        </div>
      </div>
      <div className="club_divs">
      <div className="club_img_div">
        <img src={PixelsClub} className="club_images">
        </img>
        </div>
        <div className="club_head">
          <h4>
            Pixels-Photography Club
          </h4>
        </div>
      </div>
      
    </div>

    </section>
    <section className="contact">
      <div className="contact_divs">
        <div>
        <h4 className="contact_h4">
        Let's Talk
        </h4>
        <form onSubmit={handleSubmit} className="email-form">
              
                <div className="col form-group">
                      <TextField
                        name="name"
						            placeholder="Name"
                        handleInputState={handleInputState}
                        schema={schema.name}
						            value={data.name}
                        error={errors.name}
                        type="name"
                        style={{border:"none"}}
						           
					            />
                </div>
                <div className="col form-group">
                      <TextField
						            placeholder=" Mobile Number"
                        name="mobileNumber"
						            handleInputState={handleInputState}
                        schema={schema.mobileNumber}
						            value={data.mobileNumber}
                        error={errors.mobileNumber}
                        type="mobileNumber"
                        style={{border:"none"}}
						            
					            />
                </div>
                <div className="col form-group">
                      <TextField
						            placeholder="Email Id"
                        name="emailId"
						            handleInputState={handleInputState}
                        schema={schema.emailId}
						            value={data.emailId}
                        error={errors.emailId}
                        type="emailId"
                        style={{border:"none"}}
						            
					            />
                </div>
              
              <div className="col form-group">
                      <TextField
						            placeholder="Subject"
                        name="subject"
						            handleInputState={handleInputState}
                        schema={schema.subject}
						            value={data.subject}
                        error={errors.subject}
                        type="subject"
                        style={{border:"none"}}
						           
					            />
              </div>
              <div className="col form-group">
              <TextField
						          
						            placeholder="message"
                        name="message"
						            handleInputState={handleInputState}
                        schema={schema.message}
						            value={data.message}
                        error={errors.message}
                        type="message"
                        style={{border:"none"}}
						            
					            />
              </div>
              <div style={{marginTop:"20px"}}><button type="submit" className="button-40">Send Message</button></div>
            </form>
        </div>
        <div>
          <img src={main} className="contact_img">
          </img>
        </div>
      </div>
    </section>
    <section className="web">
      <div className="web-divs">
        <div className="web-div">
          <img src={Web} className=""></img>
        </div>
        <div>
          <h4>Sridhar Singapakula</h4>
          <p>Institute Web Nominee</p>
          <div className="links">
          <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          <a href="#" className="email"><i className="bi bi-envelope"></i></a>
          <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
          
          </div>
        </div>
      </div>
      <div className="web-divs">
        <div className="web-div">
          <img src={Aditi} className=""></img>
        </div>
        <div>
          <h4>Aditi Chintey</h4>
          <p>Institue Publicity&Marketing Nominee</p>
          <div className="links">
          <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
          <a href="#" className="email"><i className="bi bi-envelope"></i></a>
          <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
          
          </div>
        </div>
      </div>
    </section>
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
  )
}

export default Main
