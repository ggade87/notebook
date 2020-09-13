import React, { Component } from "react";
import classes from "./Contact.module.css";
import RichTextBox from "./../RichTextBox/RichTextBox";
class Contact extends Component {
  state = {};
  render() {
    return (
      <div className={classes.Contact}>
        <strong>
          Create FeedBack and suggetion form and rating review here
        </strong>
        <br></br>
        <br></br> <br></br>
        <strong> On going task</strong>
        <ul style={{ textAlign: "left" }}>
          <li>
            Add fucntionality to RichTextBox to save and display link :- status:
          </li>
          <li>Create Contact form :- status: </li>
          <li>Work on Account page :- status: </li>
          <li>Change Main menu and Sub Menu design :- status: </li>
          <li>Design HomePage :- status: </li>
          <li>Create table in RichTextBox :- status: </li>
        </ul>
      </div>
    );
  }
}

export default Contact;
