import React from "react";
import PUT from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
  inlineBlock: {
    display: "inline-block",
  },
});

class CustomerUpdate extends React.Component {
  constructor(props) {
    super(props);
    //초기 보여주는 값
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
      password: null,
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  updateCustomer(id) {
    const url = "/api/customers/" + id;
    fetch(url, {
      method: "UPDATE",
    });
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.username);
    formData.append("password", this.state.password);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return PUT(url, formData, config);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.inlineBlock}>
        <IconButton
          // variant="contained"
          // color="primary"
          onClick={this.handleClickOpen}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle onClose={this.handleClose}>수정하기</DialogTitle>
          <DialogContent>
            <Typography gutterBottom>선택한 고객 정보를 수정합니다.</Typography>
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
            <TextField
              label="현재 비밀번호"
              type="password"
              name="password"
              value={this.password}
              onChange={this.handleValueChange}
              inputProps={{
                maxlength: 20,
              }}
              required
            />
            <br />
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
                color="primary"
                value="여자"
                control={<Radio color="primary" />}
                label="여자"
              />
              <FormControlLabel
                value="남자"
                control={<Radio color="primary" />}
                label="남자"
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
              onClick={(e) => {
                this.updateCustomer(this.props.id);
              }}
            >
              수정
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CustomerUpdate);
