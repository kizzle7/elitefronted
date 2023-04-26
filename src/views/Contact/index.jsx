import Header from "../../components/Header/index";
import "./index.css";
import call from "../../assets/images/call.png"
import location from "../../assets/images/location.png"
import msgBox from "../../assets/images/msg-box.png"
import Ribbon from "../../components/PageComponents/Ribbon-Area";
import { Footer } from "../../components/Footer/Footer";
import Community from "../../components/PageComponents/Community";
function Contact() {
  return (
    <div className="hero-container">
      <Header title="Get in touch" sub="" headerStyle="half-bg" />
      <div className="fore-dark-bg contact-top">
        <div className="col-md-10 offset-2">
        <div className="row">
          <div className="col-md-4">
            <div id="circle">
              <div className="d-flex justify-content-center align-items-center h-100">
              <img src={call} className="w-50" />
              </div>
            </div>
            <br />
            <p>08106112717</p>
            <p>08106112717</p>

          </div>
          <div className="col-md-4">
          <div id="circle">
          <div className="d-flex justify-content-center align-items-center h-100">
              <img src={location} className="w-50" />
              </div>
          </div>
          <br />
          <p>apt 2, novabase ,lekki phase 1</p>
          <p> lagos, Nigeria</p>
          </div>{" "}
          <div className="col-md-4">
          <div id="circle">
          <div className="d-flex justify-content-center align-items-center h-100">
              <img src={msgBox} className="w-50" />
              </div>
          </div>
          <br />
          <p>Info@hniprime.com</p>
          </div>
        </div>
        </div>
        
      </div>
      <br />
      <br />
      <br />
      <Ribbon />

      <br />
      <br />
      <br />
      <div className="pt-5 pb-5">
        <Community />
      </div>
      <br />
      <Footer />
    </div>
  );
}

export default Contact;
