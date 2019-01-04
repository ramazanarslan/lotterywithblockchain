import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import abi from "../abi.json";

var Web3 = require("web3");

var contract;
var contractaddress;
var web3;
var metamaskAddress;

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class ControlledExpansionPanels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNu: "",
      randomHash: "",
      revealRandomNu: "",
      expanded: null,
      ticker: ""
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  async componentDidMount() {
    web3 = new Web3(window.web3.currentProvider);
    contractaddress = "0xd41b07a7007b4f1b3d81895910a5f69f98288c28";
    contract = new web3.eth.Contract(abi, contractaddress);
    console.log("web3 :", web3);
    let account = await web3.eth.getAccounts();
    metamaskAddress = account[0];
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === "panel1"} onChange={this.handleChange("panel1")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Purchase Ticket</Typography>
            <Typography className={classes.secondaryHeading}>Get the ticket</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Ticket Number"
                  value={this.state.ticketNu}
                  onChange={this.handleChangeText("ticketNu")}
                  margin="normal"
                  variant="outlined"
                  placeholde={"12345"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Random Hash Number "
                  value={this.state.randomHash}
                  onChange={this.handleChangeText("randomHash")}
                  margin="normal"
                  variant="outlined"
                  placeholder={"0x062a1128335a8fb89caab222acdc9d048d686909"}
                />
              </Grid>
            </Grid>

            <Button onClick={() => this.btnPurchase()} variant="contained" color="secondary">
              Buy ticket
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === "panel2"} onChange={this.handleChange("panel2")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Reveal Your Ticket</Typography>
            <Typography className={classes.secondaryHeading}>Reveal your ticket</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Reveal Random Number"
                  value={this.state.revealRandomNu}
                  onChange={this.handleChangeText("revealRandomNu")}
                  margin="normal"
                  variant="outlined"
                  placeholde={"12345"}
                />
              </Grid>
            </Grid>

            <Button onClick={() => this.btnReveal()} variant="contained" color="secondary">
              Reveal
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === "panel3"} onChange={this.handleChange("panel3")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Results </Typography>
            <Typography className={classes.secondaryHeading}>Result are here</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: "column" }}>
            <Typography>
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]{" "}
            </Typography>

            <Typography>
              [237, 254, 164, 157, 149, 2, 28, 202, 137, 249, 117, 106, 17, 231, 103, 106, 89, 163, 46, 46, 178, 17,
              179, 229]
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === "panel4"} onChange={this.handleChange("panel4")}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>WithDraw Money</Typography>
            <Typography className={classes.secondaryHeading}>You can withdraw your money</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-name"
                  label="Ticket Number"
                  value={this.state.ticket}
                  onChange={this.handleChangeText("ticket")}
                  margin="normal"
                  variant="outlined"
                  placeholde={"12345"}
                />
              </Grid>
            </Grid>

            <Button onClick={() => this.btnWithDraw()} variant="contained" color="secondary">
              WithDraw
            </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  handleChangeText = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  btnWithDraw() {
    if (this.state.ticket !== "") {
      contract.methods.reveal(parseInt(this.state.ticket)).send(
        {
          from: metamaskAddress,
          to: contractaddress,
          gas: 500000,
          gasPrice: 18000000000
        },
        function(error, transactionHash) {
          if (!error) {
            console.log("RESULT :", JSON.stringify(transactionHash));
          } else {
            console.error(error);
          }
        }
      );
    }
  }
  btnPurchase() {
    if (this.state.ticketNu !== "" && this.state.randomHash !== "") {
      var amount = 3;
      var tokens = web3.utils.toWei(amount.toString(), "ether");
      contract.methods.purchase(parseInt(this.state.ticketNu), this.state.randomHash).send(
        {
          from: metamaskAddress,
          to: contractaddress,
          value: tokens,
          gas: 500000,
          gasPrice: 18000000000
        },
        function(error, transactionHash) {
          if (!error) {
            console.log("RESULT :", JSON.stringify(transactionHash));
          } else {
            console.error(error);
          }
        }
      );
    }
  }

  btnReveal() {
    if (this.state.revealRandomNu !== "") {
      contract.methods.reveal(parseInt(this.state.revealRandomNu)).send(
        {
          from: metamaskAddress,
          to: contractaddress,
          gas: 500000,
          gasPrice: 18000000000
        },
        function(error, transactionHash) {
          if (!error) {
            console.log("RESULT :", JSON.stringify(transactionHash));
          } else {
            console.error(error);
          }
        }
      );
    }
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
