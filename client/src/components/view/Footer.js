import React, { Component } from "react";
import "./../styles/footer.css";
import PQD from "./../../photos/PQD_pc_Mac.jpg";

class Footer extends Component {
  render() {
    return (
      <div id="myFooter">
        <footer className="section footer-classic context-dark bg-image">
          <div className="container">
            <div className="row row-30">
              <div className="col-md-4 col-xl-5">
                <div className="pr-xl-4">
                  <a className="brand" href="index.html">
                    <img
                      className="brand-logo-light"
                      alt=""
                      width="140"
                      height="37"
                      srcSet={PQD}
                    />
                  </a>
                  <br />
                  <br />
                  <p>
                    PQD protocol provides decentralized asset management services
                  </p>

                  <p className="rights">
                    <span>©  </span>
                    <span className="copyright-year">2023</span>
                    <span> </span>
                    <span>PQD Protocol</span>
                    <span>. </span>
                    <span>All Rights Reserved.</span>
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                {/* <h5>Contacts</h5>
                <dl className="contact-list">
                  <dt>Address:</dt>
                  <dd>
                    DGS-Campus Phase-1, HP Avenue 39/40, Electronics City, Hosur
                    Road Bangalore 560100 India
                  </dd>
                </dl>
                <dl className="contact-list">
                  <dt>email:</dt>
                  <dd>
                    <a href="mailto:#">dxctechnology@gmail.com</a>
                  </dd>
                </dl>
                <dl className="contact-list">
                  <dt>phones:</dt>
                  <dd>
                    <a href="tel:#">+919876543210</a> <span>or</span>{" "}
                    <a href="tel:#">+919876543210</a>
                  </dd>
                </dl> */}
              </div>
              <div className="col-md-4 col-xl-3">
                {/* <h5>Links</h5>
                <ul className="nav-list">
                  <li>
                    <a href="https://thrive.dxc.technology/">
                      Thrive:Thought Leadership{" "}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.dxc.technology/partner_network">
                      PQD Protocol
                    </a>
                  </li>
                  <li>
                    <a href="https://www.dxc.technology/newsroom">Newsroom</a>
                  </li>
                  <li>
                    <a href="Investor Relations">Investor Relations</a>
                  </li>
                  <li>
                    <a href="https://www.dxc.technology/careers">Careers</a>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
