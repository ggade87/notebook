import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
import classes from "./ContentForm.module.css";
import RichTextBox from "./../../../RichTextBox/RichTextBox";
class ContentForm extends Component {
    state = {  switchAnswer: false, content: "" }
    constructor(props) {
        super(props);
        this.inputName = React.createRef();
        this.inputContent = React.createRef();
        this.inputEditName = React.createRef();
      }
    handleData = (data) => {
        this.setState({ content: data });
      };
    handleSave = (e) => {
        e.preventDefault();
        if (this.inputName.current.value.trim() !== "")
          this.props.onContentAdded(
            this.props.id,
            this.inputName.current.value,
            this.state.switchAnswer
              ? this.inputContent.current.value
              : this.state.content
          );
        this.inputName.current.value = "";
        if (this.inputContent.current) {
          this.inputContent.current.value = "";
        }

        this.props.handleSave(this.props.id);
      };
    render() { 
        return (  <div>
            Question:
            <input
              ref={this.inputName}
              type="text"
              className="form-control"
              style={{ width: "100%", margin: "0 auto" }}
            />
            <hr></hr>
            {this.state.switchAnswer ? (
              <textarea
                ref={this.inputContent}
                type="text"
                className="form-control"
                style={{ width: "100%", margin: "0 auto" }}
              />
            ) : (
              <div>
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.content,
                  }}
                />  */}
                <RichTextBox handleData={this.handleData}></RichTextBox>
              </div>
            )}
            <hr></hr>
            <button className="btn btn-warning" onClick={this.handleSave}>
              Save
            </button>
            <button className="btn btn-warning" onClick={() => {this.props.close()}}>
                        close
            </button> 
          </div>);
    }
}

const mapStateToProps = (state) => {
    return {
      contentError: state.home.contentError,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        onContentAdded: (id, name, value) => dispatch(actions.addContent(id, name, value)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ContentForm);
  