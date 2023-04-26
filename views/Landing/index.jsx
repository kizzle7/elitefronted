import Header from "../../components/Header/index";
import Ribbon from "../../components/PageComponents/Ribbon-Area";
import apple from "../../assets/images/apple.png";
import appleStore from "../../assets/images/apple-store.svg";
import playStore from "../../assets/images/play-store.svg";

import mockup from "../../assets/images/mockup-2.png";
import { Button } from "../../components/Button/index";
import { Input } from "../../components/Input/index";
import { Footer } from "../../components/Footer/Footer";
import appleBtn from "../../assets/images/apple-btn.svg";
import playstore from "../../assets/images/playstore.png";
import Community from "../../components/PageComponents/Community";
import "./index.css";
function Landing() {
  return (
    <div className="hero-container">
      <Header
        title="Exclusive solution for all"
        sub="Hnis"
        subitle="Travels, luxury, fashion, business, community"
        button
        buttonText="Join the community"
        headerStyle="full-bg"
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="prime-x-section mt-5 pt-5 primx-landing">
        <div className="row">
          <div className="col-md-4 col-12 orange-border mr-5">
            <div className="fore-ribbon-img"></div>
          </div>
          <div className="col-md-7 col-12">
            <div className="primeX-area">
              <h4 className="pb-3 pt-3">The Prime X</h4>
              <h3 className="primary-text">Why you should be a prime</h3>
              <br />
              <div className="font-texts">
                <div>
                  The first was to convince my husband of the merits of all -
                  natural deodorant, including the kind that hasn't been
                  processed with formaldehyde.
                </div>{" "}
                <div>
                  So I went into a Mary Kay meeting with a list of deodorants
                  and asked for everyone's opinion.
                </div>{" "}
                <div>
                  {" "}
                  Then I discussed my options with my husband and some friends.
                  I ultimately chose the original version - there are also many
                  versions in different scents, oils, and a couple of powders.{" "}
                </div>{" "}
                <br />
                <div>
                  I liked the weight of the paste and the scent was fresh and
                  different from other brands that I have tried.{" "}
                </div>
                <br />
                <div>
                  After using it for about a week and experiencing no problem
                  with breakouts (thankfully), I realized that it has a certain
                  mental appeal. After trying it, I realized that I had been
                  accidentally using more of it than I realized.
                </div>
                <br />
                <div className="d-flex d-flex justify-content align-items-center">
                  <div
                    className="pr-5 font-weight-bold"
                    style={{ opacity: 1, color: "#002581" }}
                  >
                    Read More
                  </div>
                  <div
                    className="font-weight-bold"
                    style={{ color: "#FFD43B", opacity: 1 }}
                  >
                    Watch Our Video
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <br />
      <Ribbon />

      <div className="commercials">
        <div className="for-personal">
          <div className="fore-dark-border">
            <div className="row">
              <div className="col-md-5 col-12 spinner-bg">
                <div>
                  <h4 className="text-white">For Personal</h4>
                  <br />
                  <h4 className="orange-text">Prime x</h4>
                  <br />
                  <div className="text-white font-texts" style={{ opacity: 1 }}>
                    <div>
                      The first was to convince my husband of the merits of all
                      - natural deodorant, including the kind that hasn't been
                      processed with formaldehyde.{" "}
                    </div>{" "}
                    <div>
                      So I went into a Mary Kay meeting with a list of
                      deodorants and asked for everyone's opinion.
                    </div>{" "}
                    <div>
                      {" "}
                      Then I discussed my options with my husband and some
                      friends. I ultimately chose the original version - there
                      are also many versions in different scents, oils, and a
                      couple of powders.
                    </div>
                    <br />
                    <br />
                    <div className=" pt-2">
                      {/* <div className="download-btn">
                        <div className="d-flex justify-content-between align-items-center">
                          <img src={apple} width="40" />
                          <div>
                            <div className="small-text-dark">
                              Download on the
                            </div>
                            <div className="medium-text-dark">App Store</div>
                          </div>
                        </div>
                      </div> */}
                      <img src={appleBtn} width="150" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-12">
                <div className="d-flex justify-content-center align-items-center">
                  <img src={mockup} width="130%" className="img-pos" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <div className="prime-x-section mt-5">
          <div className="row">
            <div
              className="col-md-4 col-12 white-border mr-5"
              style={{ background: "white" }}
            >
              <div className="orange-border-img-box" width="120%"></div>
            </div>
            <div className="col-md-7 col-12">
              <div className="business-commercials">
                <h4>For Business</h4>
                <div className="hero-medium-text">The Merchant App</div> <br />
                <div className="text-dark font-texts" style={{ opacity: 1 }}>
                  <div className="font-texts" style={{ fontSize: "16px" }}>
                    The first was to convince my husband of the merits of all -
                    natural deodorant, including the kind that hasn't been
                    processed with formaldehyde.{" "}
                  </div>{" "}
                  <div>
                    So I went into a Mary Kay meeting with a list of deodorants
                    and asked for everyone's opinion.{" "}
                  </div>{" "}
                  <div>
                    Then I discussed my options with my husband and some
                    friends. I ultimately chose the original version - there are
                    also many versions in different scents, oils, and a couple
                    of powders.
                  </div>{" "}
                  <br />
                  <div>
                    {" "}
                    I liked the weight of the paste and the scent was fresh and
                    different from other brands that I have tried.{" "}
                  </div>{" "}
                  <div>
                    <br /> After using it for about a week and experiencing no
                    problem with breakouts (thankfully), I realized that it has
                    a certain mental appeal.
                  </div>{" "}
                  <br />
                  <div>
                    {" "}
                    After trying it, I realized that I had been accidentally
                    using more of it than I realized.
                  </div>
                  <br />
                  <br />
                  <div className=" pt-2 d-flex justify-content align-items-center">
                  <img src={appleStore} className="mr-4" width="150" />

                  <img src={playStore} className="" width="150" />

                    {/* <div className="download-btn-dark">
                      <div className="d-flex justify-content align-items-center">
                        <img
                          src={
                            "https://i.pinimg.com/originals/5c/f6/fa/5cf6fa281b3652bb3a0b52c31fde83bf.png"
                          }
                          width="50"
                        />
                        <div>
                          <div className="small-text-dark">Download on the</div>
                          <div className="medium-text-dark">App Store</div>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="download-btn-dark ml-4">
                      <div className="d-flex justify-content align-items-center">
                        <img src={playstore} width="50" />
                        <div>
                          <div className="small-text-dark">Get it on</div>
                          <div className="medium-text-dark">Play Store</div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <Community />

      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Landing;
