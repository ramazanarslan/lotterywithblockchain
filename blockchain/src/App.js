import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Appbar from "./Appbar";
import Grid from "@material-ui/core/Grid";

// var address = "https://ropsten.etherscan.io/address/0x7398ccc727abe4cc1fa4a53617788090eaa3efc2";

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/a39b56221e7d4a02b0871df289ebf72c"));

var version = web3.version.api;
// $.getJSON('http://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359', function (data) {
//     var contractABI = "";
//     contractABI = JSON.parse(data.result);
//     if (contractABI != ''){
//         var MyContract = web3.eth.contract(contractABI);
//         var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
//         var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
//         console.log("result1 : " + result);
//         var result = myContractInstance.members(1);
//         console.log("result2 : " + result);
//     } else {
//         console.log("Error" );
//     }
// });

// if	(typeof	web3	!==	'undefined')	{
// 		web3	=	new	Web3(web3.currentProvider);
// }	else	{
// 		//	set	the	provider	you	want	from	Web3.providers
// 		web3	=	new	Web3(new	Web3.providers.HttpProvider("http://localhost:8545"));
// }

// var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
//   from: '0x1234567890123456789012345678901234567891', // default from address
//   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });

class App extends Component {
  componentDidMount() {
    if (!web3.isConnected()) {
      console.log("connected");
      // show some dialog to ask the user to start a node
    } else {
      // start web3 filters, calls, etc
      console.log("NOT connected");
    }
  }

  // 8545 adres ]
  // buyticket
  // sendTransc
  constructor(props) {
    super(props);
    this.state = {
      ticketNu: "",
      randomHash: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <Appbar />

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              id="outlined-name"
              label="Ticket Number"
              value={this.state.ticketNu}
              onChange={this.handleChange("ticketNu")}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-name"
              label="Random Hash Number"
              value={this.state.randomHash}
              onChange={this.handleChange("randomHash")}
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="secondary">
          Buy ticket
        </Button>
      </div>
    );
  }
}

export default App;
