import React from "react";
import { put } from "axios";
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
// import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
  inlineBlock: {
    display: "inline-block",
  },
  ModifyProfile: {
    display: "block",
    margin: "10px",
  },
});

class CustomerUpdate extends React.Component {
  constructor(props) {
    super(props);
    //초기 보여주는 값
    this.state = {
      file: null,
      username: this.props.username,
      password: this.props.password,
      gender: this.props.gender,
      job: this.props.job,
      fileName: "",
      open: false,
      image: this.props.image,
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.updateCustomer().then((response) => {
      console.log("PUT전송하였습니다!!!!!!");
      console.log(response.data);
      this.props.stateRefresh();
    });
    //전송 후 초기화
    this.setState({
      file: null,
      username: "",
      password: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
      image: "",
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
      // file: null,
      // username: "",
      // password: "",
      // gender: "",
      // job: "",
      // fileName: "",
      open: false,
      // image: "",
    });
  };

  updateCustomer = (id) => {
    const url = "/api/customers/" + id;
    // fetch(url, {
    //   method: "PUT",
    // });
    const formData = new FormData();

    if (this.state.fileName !== "") {
      console.log("파일유");
      formData.set("image", this.state.file);
      formData.set("fileCheck", "1");
    } else {
      console.log("파일무");
      formData.set("fileCheck", "0");
    }
    formData.set("name", this.state.username);
    formData.set("password", this.state.password);
    formData.set("gender", this.state.gender);
    formData.set("job", this.state.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return put(url, formData, config), this.props.stateRefresh();
  };

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
            <Box boxShadow={5} className="profileIMG modifyIMG middle">
              <img
                className="profileIMG modifyIMG middle"
                src={this.state.image}
                alt="profile"
              />
            </Box>
            <Typography className="middle" variant="h5">
              현재 이미지
            </Typography>
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              type="file"
              file={this.state.file}
              value={this.state.fileName}
              onChange={this.handleFileChange}
            />
            <label htmlFor="raised-button-file" className="middle">
              <Button
                variant="contained"
                color="primary"
                component="span"
                name="file"
                className="middle"
              >
                {this.state.fileName === ""
                  ? "프로필 이미지 수정"
                  : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField
              label="이름"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleValueChange}
              required
            />
            <br />
            <TextField
              label="현재 비밀번호"
              type="text"
              name="password"
              value={this.state.password}
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
              value={this.state.gender}
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
              value={this.state.job}
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
