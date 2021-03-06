import React, { Component } from "react";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import SNS from "./components/SNS";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
// import { axios, get } from "axios";
import Grid from "@material-ui/core/Grid";
import FaceIcon from "@material-ui/icons/Face";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    minWidth: 1080,
  },
  menu: {
    margin: 20,
    display: "flex",
    justifyContent: "flex-end",
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  table: {
    minWidth: 1080,
  },
  TableHead: {
    fontSize: "1.5rem",
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    fontSize: "5rem",
    color: "#686868",
    display: "inline-block",
    margin: 5,
  },
  mainButton: {
    display: "inline-block",
    width: "300px",
  },
  mainButtonTypo: {
    display: "inline-block",
    padding: theme.spacing(2),
    color: "#686868",
  },
  mainButtonGrid: {
    padding: theme.spacing(2),
    textAlign: "center",
    margin: 20,
  },
  mainBG: {
    // backgroundColor: "blue",
    padding: 70,
  },
  title: {
    marginLeft: 5,
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  TypoBot: {
    marginBottom: 20,
  },
  homeIcon: {
    fontSize: "2.5rem",
    color: "white",
  },
});

// const customers = [];

class App extends Component {
  constructor(props) {
    super(props);
    // ???????????????
    this.state = {
      customers: "",
      snsbbs: "",
      complete: 0,
      searchKeyword: "",
      bbsToggle: true,
      mainPage: 0,
    };
    this.bbsHandleChange = this.bbsHandleChange.bind(this);
  }

  stateRefresh = () => {
    this.setState({
      customers: "",
      snsbbs: "",
      complete: 0,
      searchKeyword: "",
    });
    if (this.state.bbsToggle) {
      this.callApi()
        .then((res) =>
          this.setState({
            customers: res,
          })
        )
        .catch((err) => console.log(err));
    } else if (!this.state.bbsToggle) {
      this.callApi()
        .then((res) =>
          this.setState({
            snsbbs: res,
          })
        )
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 0.02);
    if (this.state.bbsToggle) {
      this.callApi()
        .then((res) =>
          this.setState({
            customers: res,
          })
        )
        .catch((err) => console.log(err));
    } else if (!this.state.bbsToggle) {
      this.callApi()
        .then((res) =>
          this.setState({
            snsbbs: res,
          })
        )
        .catch((err) => console.log(err));
    }
  }

  callApi = async () => {
    var response = "";
    if (this.state.bbsToggle) {
      // ????????????
      response = await fetch("/api/customers", { method: "GET" });
    } else {
      // sns??????
      response = await fetch("/api/snsbbs", { method: "GET" });
    }
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 1000 ? 0 : completed + 1 });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  bbsHandleChange() {
    console.log("?????? ??????!!");
    this.setState({
      customers: "",
      snsbbs: "",
      bbsToggle: !this.state.bbsToggle,
    });
    this.stateRefresh();
  }

  customerShow = () => {
    this.setState({
      mainPage: 1,
      bbsToggle: false,
    });
    this.stateRefresh();
  };
  snsShow = () => {
    this.setState({
      mainPage: 1,
      bbsToggle: true,
    });
    this.stateRefresh();
  };

  gotoMain = () => {
    this.setState({
      mainPage: 0,
    });
  };

  render() {
    const filteredComponrnts = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c) => {
        return (
          <Customer
            stateRefresh={this.stateRefresh}
            key={c.id}
            id={c.id}
            image={c.image}
            name={c.name}
            password={c.password}
            gender={c.gender}
            job={c.job}
            // fileCheck={c.fileCheck}
          />
        );
      });
    };
    const { classes } = this.props;
    const cellList = [
      "??????",
      "?????????",
      "??????",
      "????????????",
      "??????",
      "??????",
      "??????",
    ];

    if (this.state.mainPage === 0) {
      return (
        <div className={classes.mainBG}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Typography className={classes.TypoBot} variant="h1">
              ???????????????.
            </Typography>
            <Typography className={classes.TypoBot} variant="h4">
              ??????, ????????? ?????? ????????? ?????????.
            </Typography>
            <Typography className={classes.TypoBot} variant="subtitle1">
              ???????????? ????????? ???????????????.
            </Typography>
            <Grid container spacing={1} justify="center" alignItems="center">
              <Grid item xs className={classes.mainButtonGrid}>
                <Button
                  className={classes.mainButton}
                  variant="outlined"
                  // color="primary"
                  onClick={this.customerShow}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <FaceIcon className={classes.menuIcon} />
                    <Typography variant="h6" className={classes.mainButtonTypo}>
                      ?????? ?????? ?????????
                    </Typography>
                  </Grid>
                </Button>
              </Grid>
              <Grid item xs className={classes.mainButtonGrid}>
                <Button
                  className={classes.mainButton}
                  variant="outlined"
                  // color="primary"
                  onClick={this.snsShow}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <ArtTrackIcon className={classes.menuIcon} />
                    <Typography variant="h6" className={classes.mainButtonTypo}>
                      SNS ?????? ?????????
                    </Typography>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    } else if (this.state.mainPage !== 0) {
      return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              {/* ????????? ?????? */}
              <Button onClick={this.gotoMain}>
                <HomeRoundedIcon className={classes.homeIcon} />
              </Button>
              <Typography className={classes.title} variant="h6" noWrap>
                {this.state.bbsToggle
                  ? " SNS ?????? ?????????"
                  : " ?????? ?????? ?????????"}
              </Typography>
              {/* ?????? ?????? */}
              <Button variant="contained" onClick={this.bbsHandleChange}>
                {!this.state.bbsToggle ? "SNS ?????? ?????????" : "?????? ?????? ?????????"}
              </Button>
              {!this.state.bbsToggle ? (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="???????????? ??????"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                    name="searchKeyword"
                    value={this.state.searchKeyword}
                    onChange={this.handleValueChange}
                  />
                </div>
              ) : (
                ""
              )}
            </Toolbar>
          </AppBar>

          {!this.state.bbsToggle ? (
            <div className={classes.menu}>
              <CustomerAdd stateRefresh={this.stateRefresh} />
            </div>
          ) : (
            ""
          )}
          <Paper className={classes.paper}>
            {!this.state.bbsToggle ? (
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {cellList.map((c) => {
                      return (
                        <TableCell className={classes.tableHead}>{c}</TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* ????????? ?????? ??? */}
                  {this.state.customers ? (
                    filteredComponrnts(this.state.customers)
                  ) : (
                    <TableRow>
                      <TableCell colSpan="6" align="center">
                        <CircularProgress
                          className={classes.progress}
                          variant="determinate"
                          value={this.state.completed}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            ) : (
              <div>
                {this.state.snsbbs ? (
                  this.state.snsbbs.map((c) => {
                    return (
                      <SNS
                        // IDX={c.IDX}
                        WRITER={c.WRITER}
                        CONTENT={c.CONTENT}
                        CREATE_DATE={c.CREATE_DATE}
                        IMAGE={c.IMAGE}
                      />
                    );
                  })
                ) : (
                  // <Grid container justify="center" alignItems="center">
                  //   <Typography variant="h2" align="center">
                  //     <br />
                  //     <br />
                  //     ???????????????.
                  //     <br />
                  //     ????????? ????????????.
                  //     <br />
                  //     <br />
                  //     <br />
                  //   </Typography>
                  // </Grid>

                  <CircularProgress />
                )}
              </div>
            )}
          </Paper>
        </div>
      );
    }
  }
}

export default withStyles(styles)(App);
