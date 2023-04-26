import Header from "../../components/Header/index";
import "./index.css";
import { Footer } from "../../components/Footer/Footer";
import cron from "../../assets/images/cron.svg";
import cron2 from "../../assets/images/cron2.png";
import person from "../../assets/images/person.png";
import person2 from "../../assets/images/first-sqaure.png";
import Community from "../../components/PageComponents/Community";
import React, { useEffect, useState } from "react";
function About() {
  const [stage1, setStage1] = useState(true);
  const [stage2, setStage2] = useState(false);
  const [stage3, setStage3] = useState(false);

  const gotoStage1 = () => {
    setStage1(true);
    setStage2(false);
    setStage3(false);
  };

  const gotoStage2 = () => {
    setStage1(false);
    setStage2(true);
    setStage3(false);
  };

  const gotoStage3 = () => {
    setStage1(false);
    setStage2(false);
    setStage3(true);
  };

  return (
    <div className="hero-container">
      <Header title="Always About the Value!" sub="" headerStyle="half-bg" />
      <div className="mt-5 about-page-top">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="primeX-area">
              <h4 className=" pt-3 menu-text">Our Story</h4>
              <div className="d-flex">
                <div className="thin-menu-line"></div>
                <div className="thick-menu-line"></div>
              </div>
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
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="d-flex justify-content-center align-items-center">
              <img src={cron} className="w-75" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className="mt-5 pt-5">
        <div>
          <div className="fore-dark-border-bg">
            <div className="row">
              <div className="col-md-6 col-12 ">
                <div className="d-flex ">
                  <div className="mr-5">
                    <div className="d-flex align-items-center flex-column">
                      <div
                        className={`mb-5 ${
                          stage1
                            ? "vertical-carousel-active"
                            : "vertical-carousel"
                        }`}
                        onClick={gotoStage1}
                      ></div>
                      <div
                        className={`mb-5 ${
                          stage2
                            ? "vertical-carousel-active"
                            : "vertical-carousel"
                        }`}
                        onClick={gotoStage2}
                      ></div>
                      <div
                        className={`mb-5 ${
                          stage3
                            ? "vertical-carousel-active"
                            : "vertical-carousel"
                        }`}
                        onClick={gotoStage3}
                      ></div>
                    </div>
                  </div>
                  {stage1 && (
                    <div>
                      <div
                        className="orange-text-medium"
                        style={{ fontWeight: "300" }}
                      >
                        Our mission
                      </div>
                      <h3 className="pt-4 text-white font-weight-bold">
                        Building a community <br />
                        that understands value
                      </h3>
                      <br />
                      <div className="text-white" style={{ opacity: 1 }}>
                        <div>
                          The first was to convince my husband of the merits of
                          all - natural deodorant, including the kind that
                          hasn't been processed with formaldehyde.{" "}
                        </div>{" "}
                        <div>
                          So I went into a Mary Kay meeting with a list of
                          deodorants and asked for everyone's opinion.
                        </div>{" "}
                        <div>
                          {" "}
                          Then I discussed my options with my husband and some
                          friends. I ultimately chose the original version -
                          there are also many versions in different scents,
                          oils, and a couple of powders.
                        </div>
                        <br />{" "}
                        <div>
                          {" "}
                          I liked the weight of the paste and the scent was
                          fresh and different from other brands that I have
                          tried.
                        </div>{" "}
                        <br />
                        <div>
                          {" "}
                          After using it for about a week and experiencing no
                          problem with breakouts (thankfully), I realized that
                          it has a certain mental appeal.{" "}
                        </div>
                        <br />{" "}
                        <div>
                          {" "}
                          After trying it, I realized that I had been
                          accidentally using more of it than I realized.
                        </div>
                        <br />
                        <br />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 about-eclipse">
                <div
                  className="d-flex justify-content-center align-items-start"
                  style={{ height: "100%" }}
                >
                  <img src={person} width="200" />
                  <div className="below-pic">
                  <img src={person2} width="200" />
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
      {/* <div>
        <div>
          <div className="ribbon-area">
            <h3 className="tetiary-text text-center">
              <div className="hero-medium-text text-center">Meet the Team</div>{" "}
              <br />
            </h3>
            <br />
            <br />
            <div className="col-md-8 offset-2">
              <div className="row">
                <div className="col-md-4 col-12" id="circle"></div>
                <div className="col-md-4 col-12" id="circle"></div>
                <div className="col-md-4 col-12" id="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

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

export default About;
