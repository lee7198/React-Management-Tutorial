import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    minWidth: 1080,
  },
  table: {
    minWidth: 1080,
  },
  TableHead: {
    fontSize: "1.5rem",
  },
  tableMagin: {
    margin: 30,
  },
  inlineBlock: {
    display: "inline-block",
  },
  textaligncenter: {
    textAlign: "left",
  },
  imagearea: {
    width: 550,
  },
});

class SNS extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.tableMagin}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan="2">SNS관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.imagearea}>
                <TableRow>
                  <img src={this.props.IMAGE} className={classes.inlineBlock} />
                </TableRow>
              </TableCell>
              <TableCell>
                <TableRow>
                  <TableCell>
                    <div className={classes.inlineBlock}>
                      <img
                        className="profileIMG modifyIMG middle"
                        src="https://source.unsplash.com/category/nature/64x64"
                        alt="profile"
                      />
                    </div>
                    <Typography className={classes.inlineBlock} variant="h4">
                      {this.props.WRITER}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <Typography
                    className={classes.tableMagin}
                    variant="subtitle1"
                  >
                    {this.props.CONTENT}
                  </Typography>
                </TableRow>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(SNS);
