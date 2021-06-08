import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from "./CustomerDelete";
import CustomerUpdate from "./CustomerUpdate";

class Customer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>
          <img className="profileIMG" src={this.props.image} alt="profile" />
        </TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.password}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell>
          <CustomerUpdate
            stateRefresh={this.props.stateRefresh}
            id={this.props.id}
          />
          <CustomerDelete
            stateRefresh={this.props.stateRefresh}
            id={this.props.id}
          />
        </TableCell>
      </TableRow>
    );
  }
}

export default Customer;
