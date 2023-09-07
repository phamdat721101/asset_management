import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
// import Classie from "classie";
import "./../components/styles/display.css";
import Header from "./view/Header";
import axios from "axios";
import Footer from "./view/Footer";
class AssetDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapterName: this.props.match.params.chapterName,
      assetId: this.props.match.params.assetId,
      asset: [],
      owner: "0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E",
      isOpen: false,
      investments:[],
      transactionHash: "0x0566eebe30e5409a9a73d3609eb837d476b156d2023926dd3fa361030c75a92c"
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    sessionStorage.setItem("url", window.location.pathname);
    const SERVICE_API_URL = "http://localhost:3002";
    console.log("Hi");
    console.log(this.state.chapterName, this.state.assetId);
    let auth_key = localStorage.getItem("auth_Key");
    if (auth_key) {
      axios
        .get(
          `${SERVICE_API_URL}/api/assets/${this.state.chapterName}/${this.state.assetId}`
        )
        .then(response => {
          this.setState({
            asset: response.data[0]
          });
        });
    } else {
      this.props.history.push("/");
    }
  }

  invest(asset){
    let SERVICE_API_URL = "http://localhost:3002";
    axios.post(
      'http://localhost:4001/v1/order/createOrder',
      {
        "assetAddress":"PQD-D",
        "symbol":"PQD-D",
        "startPrice":12,
        "endPrice":15,
        "openAt":1,
        "closeAt":2,
        "amount":12,
        "duration":10,
        "owner":"0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E"
      }
    ).then(resp =>{
      console.log("Order resp: ", resp)
      alert("Create investment success: ", resp.data.data)
      axios.post(`${SERVICE_API_URL}/api/investments`, {
        "assetId":asset.assetName,
        "investContract":resp.data.data,
        "transactionHash":"994821423ajdas",
        "owner":"0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E"
      }).then(response => {
        console.log(response);
        if (response.data.success == false) {
          this.setState({
            message: "Duplicate asset Id, Please enter a different asset Id"
          });
          console.log(this.state.message);
        }
      });
    })
  }

  withdraw(asset){
    let SERVICE_API_URL = "http://localhost:3002";

    axios.get(
      `${SERVICE_API_URL}/api/investments/${this.state.owner}`
    ).then(response => {
      this.setState({
        investments: response.data
      });

      console.log("List investment: ", this.state.investments)
    });

    // axios.post(
    //   'http://localhost:4001/v1/order/claimProfit',
    //   {
    //     "orderAdr": "0xC0332414569B4B891ab3F68670F32e252D377489",
    //     "receiver": "0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E",
    //   }
    // ).then(resp =>{
    //   console.log("Order withdraw resp: ", resp)
    //   alert("Withdraw investment success: ", resp.data.data)
    // })
    this.setState({ isOpen: true })
  }

  closeModal = () => this.setState({ isOpen: false });

  render() {
    let { asset } = this.state;
    return (
      <div>
        <Header />
        <div id="wrapper" className="paddingClass">
          <div className="border border-secondary">
            <div>
              <div id="myHeaderClass">
                <h1>
                  <b>{asset.chapterName}</b>
                </h1>
              </div>
              <section>
                <div className="container">
                  <div>
                    <h1>
                      <i className="w3-spin fab fa-app-store"></i>
                      <span />
                      <span />
                      Asset Contract
                    </h1>
                  </div>
                  <div>
                    <h2>{asset.assetName}</h2>
                  </div>
                </div>
              </section>
              <section>
                <div className="container">
                  <h1>
                    <i className="w3-spin fab fa-blackberry"></i>
                    <span /> <span />
                    Amount
                  </h1>
                  <p>{asset.amount}</p>
                </div>
              </section>
              <section className="color">
                <div className="container">
                  <h1>
                    <i className="w3-spin fab fa-blackberry"></i>
                    <span /> <span />
                    Description
                  </h1>
                  <p>{asset.description}</p>
                </div>
              </section>
              <section>
                <div className="container">
                  <div>
                    <h1>
                      <i className="w3-spin fa fa-refresh"></i>
                      <span> </span>
                      Business Benefits
                    </h1>
                  </div>

                  <p>{asset.bBenefits}</p>
                </div>
              </section>
              <section className="color">
                <div className="container">
                  <div>
                    <h1>
                      <i className="w3-spin fa fa-github"></i>
                      <span> </span>
                      Transaction
                    </h1>
                  </div>

                  <a className="myLink" href="https://testnet.bscscan.com/tx/0xa8294a026fd497651cbfbcc1616570eec3316db9f726b12d989218b549a202ac" target="_blank">
                    {/* {asset.gitHubLink} */} Tx_Link
                  </a>
                </div>
              </section>
              <section>
                <div className="container">
                  <div>
                    <h1>
                      <i className="w3-spin fa fa-blackberry"></i>
                      <span> </span>
                      Image 
                    </h1>
                  </div>
                  <img src={asset.imgLink} />
                </div>
              </section>
              <section>
                <div className="container">
                  <div className="myButtonDiv">
                    <button
                      onClick={() => this.invest(asset)}
                      hidden={this.state.status}
                      id="myButton"
                      type="submit"
                    >
                      Invest
                    </button>
                  </div>
                </div>
              </section>
              <section>
                <div className="container">
                  <div className="myButtonDiv">
                    <button
                      onClick={() => this.withdraw(asset)}
                      hidden={this.state.status}
                      id="myButton"
                      type="submit"
                    >
                      Withdraw
                    </button>
                    <Modal show={this.state.isOpen} onHide={this.closeModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Transaction Info</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Transaction Hash: {this.state.transactionHash}</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AssetDisplay;
