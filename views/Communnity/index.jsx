import Header from "../../components/Header/index";
import "./index.css";
import { Footer } from "../../components/Footer/Footer";
import cron from "../../assets/images/fulleclipse.svg";
import Community from "../../components/PageComponents/Community";
import Ribbon from "../../components/PageComponents/Ribbon-Area";
function Communities() {
  return (
    <div className="hero-container">
      <Header title="A Community to grow and network!" sub=""  headerStyle="half-bg"/>
      <Community dark />
      <div className="pt-5 mt-5">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="primeX-area">
              <h4 className=" pt-3 menu-text">Community benefits</h4>
              <div className="d-flex">
                <div className="thin-menu-line-comm"></div>
                <div className="thick-menu-line-comm"></div>
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
      <Ribbon />
      <br />
      <br />

      <br />
      <Footer />
    </div>
  );
}

export default Communities;
