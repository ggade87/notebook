import React, { Component } from "react";
import backImage from "../../assets/images/slide-3.jpg";
import classes from "./HomePage.module.css";

class HomePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <div style={{ color: "red", fontWeight: "bold" }}>
          Write code for Home page and design.
        </div> 
        
        <img src={backImage} alt="Loading." className={classes.BackImage}></img>
      </div>
    );
  }
}

export default HomePage;
