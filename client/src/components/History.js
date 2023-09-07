import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
// import Classie from "classie";
import "./../components/styles/display.css";
import Header from "./view/Header";
import axios from "axios";
import Footer from "./view/Footer";
class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapterName: this.props.match.params.chapterName,
      owner: "0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E",
      investments: []
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    sessionStorage.setItem("url", window.location.pathname);
    const SERVICE_API_URL = "http://localhost:3002";
    axios.get(
      `${SERVICE_API_URL}/api/investments/${this.state.owner}`
    ).then(response => {
      this.setState({
        investments: response.data
      });
    });
  }

  // invest(asset){
  //   console.log("Invest Success: ", asset)
  //   axios.get(
  //     'http://109.123.233.65:4001/v1/order?orderAdr=0x2F071720B65Ac78f7c0D99e0EE6f549f062b29Be'
  //   ).then(resp =>{
  //     console.log("Order resp: ", resp)
  //   })
  // }

  // withdraw(asset){
  //   axios.post(
  //     'http://localhost:4001/v1/order/claimProfit',
  //     {
  //       "orderAdr": "0xC0332414569B4B891ab3F68670F32e252D377489",
  //       "receiver": "0x0D0Df554db5623Ba9A905D0bE4C6bAc48144841E",
  //     }
  //   ).then(resp =>{
  //     console.log("Order withdraw resp: ", resp)
  //   })
  // }

  render() {
    let { investments } = this.state;
    return (
      <div>
        <Header />
        <div id="wrapper" className="paddingClass">
          <Table responsive striped="columns">
            <thead>
              <tr>
                <th>Asset Id</th>
                <th>Owner</th>
                <th>Contract Address</th>
                <th>TxHash</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(function (investment) {
                return (
                  <tr>
                    <td>{investment.assetId}</td>
                    <td>{investment.owner}</td>
                    <td>{investment.investContract}</td>
                    <td>{investment.transactionHash}</td>
                  </tr>
                );
              })}
              {/* <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry the Bird</td>
                <td>@twitter</td>
                <td>23423</td>
              </tr> */}
            </tbody>
          </Table>
        </div>
        <Footer />
      </div>
    );
  }
}

export default History;
