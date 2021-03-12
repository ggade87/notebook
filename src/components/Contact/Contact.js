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
              Paragraph align setting in richtextbox
          </li>
          <li>
           Design RichTextEditor
          </li>
          <li>Validate richTextEditor </li>
          <li>Validate Menu and sub menu form</li>
          <li>========================================</li>
          <li>Create Contact form :- status: </li>
          <li>Design notification popup </li>
          <li>Create sticky notes</li>
          <li>Advanced search</li>
          <li>Set access to public or private</li>
          <li>Add comment to public display once comment added notification will be sent to user</li>
          <li>Design notification table and read stusut with date </li>
          <li>One user can search other user and see profile and send message.</li>
        </ul>
      </div>
    );
  }
}

export default Contact;
