import React, { Component } from "react";
import classes from "./About.module.css";
class About extends Component {
  state = {};
  render() {
    return (
      <div className={classes.About}>
        <strong>
          We provide service to maintain the data on web.
        </strong>
      </div>
    );
  }
}

export default About;
