import React, { Component } from "react";
import classes from "./Contact.module.css";
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
            Add fucntionality to RichTextBox to save and display link :- status: Completed
          </li>
          <li>Work on Account page :- status: Completed </li>
          <li>Account page - Edit/Delete Main Menu :- status: Completed </li>
          <li>Account page - Edit/Delete Sub Main Menu :- status: Completed </li>
          <li>Delete content :- status: Completed</li>
          <li>Edit content :- status: Completed </li>
          <li>========================================</li>
          <li>General search on home page which will search all matching and display :- status: In Progress</li>
          <li>Every sub menu should have auto search and display pn page :- status: </li>
          <li>Create table in RichTextBox :- status: </li>
          <li>Change Main menu and Sub Menu design :- status: </li>
          <li>Design HomePage :- status: </li>
          <li>Create Contact form :- status: </li>
        </ul>
      </div>
    );
  }
}

export default Contact;
