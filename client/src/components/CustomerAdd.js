import React from "react";
import { post } from "axios";
// import e from "express";

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      username: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
    };
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
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
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

  addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.username);
    formData.append("birthday", this.state.birthday);
    formData.append("gender", this.state.gender);
    formData.append("job", this.state.job);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지 :
        <input
          type="file"
          name="file"
          file={this.state.file}
          value={this.state.fileName}
          onChange={this.handleFileChange}
        ></input>
        <br />
        이름 :
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleValueChange}
        />
        <br />
        생년월일 :
        <input
          type="text"
          name="birthday"
          value={this.birthday}
          onChange={this.handleValueChange}
        />
        <br />
        성별 :
        <input
          type="text"
          name="gender"
          value={this.gender}
          onChange={this.handleValueChange}
        />
        <br />
        직업 :
        <input
          type="text"
          name="job"
          value={this.job}
          onChange={this.handleValueChange}
        />
        <br />
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default CustomerAdd;
