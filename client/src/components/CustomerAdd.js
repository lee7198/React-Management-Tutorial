import React from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import "./CustomerAdd.css";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
  dialog: {
    minWidth: 800,
    padding: 0,
  },
});

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      username: "",
      password: null,
      gender: "",
      job: "",
      fileName: "",
      open: false,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer().then((response) => {
      console.log(response.data);
      console.log("전송완류!!!!!!!!");
      this.props.stateRefresh();
    });
    this.setState({
      file: null,
      username: "",
      password: null,
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  changeDate = (e) => {
    this.setState({ delivery_date: e.target.value });
  };

  addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    if (this.state.fileName !== "") {
      console.log("파일유");
      formData.append("image", this.state.file);
      formData.append("fileCheck", "1");
    } else {
      console.log("파일무");
      formData.append("image", "dafaultUser");
      formData.append("fileCheck", "0");
    }
    formData.append("name", this.state.username);
    formData.append("password", this.state.password);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  //닫을 때 입력값 초기화
  handleClose = () => {
    this.setState({
      file: null,
      username: "",
      password: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          고객 추가
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.dialog}
        >
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent className={classes.container}>
            {this.state.fileName}
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              type="file"
              file={this.state.file}
              value={this.state.fileName}
              onChange={this.handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                name="file"
              >
                {this.state.fileName === ""
                  ? "프로필 이미지 선택"
                  : this.state.fileName}
              </Button>
            </label>
            <br />
            <br />
            <TextField
              label="이름"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleValueChange}
              required
              // className={classes.textField}
            />
            <br />
            <br />
            <TextField
              label="비밀번호"
              type="password"
              name="password"
              value={this.password}
              onChange={this.handleValueChange}
              inputProps={{
                maxLength: 20,
              }}
              required
            />
            <br />
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={this.gender}
              onChange={this.handleValueChange}
              className={classes.textField}
              required
            >
              성별
              <FormControlLabel
                value="남자"
                control={<Radio color="primary" />}
                label="남자"
              />
              <FormControlLabel
                color="primary"
                value="여자"
                control={<Radio color="primary" />}
                label="여자"
              />
            </RadioGroup>
            <TextField
              label="직업"
              type="text"
              name="job"
              value={this.job}
              onChange={this.handleValueChange}
              className={classes.textField}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CustomerAdd);
