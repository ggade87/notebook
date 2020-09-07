import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./SubMenuContent.module.css";
import RichTextBox from "./../RichTextBox/RichTextBox";
class SubMenuContent extends Component {
  state = { showContentForm: false, switchAnswer: false, content: "" };
  constructor() {
    super();
    this.inputName = React.createRef();
    this.inputContent = React.createRef();
  }
  componentDidMount() {
    this.props.onSubMenuContentLoad(this.props.id);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.props.onSubMenuContentLoad(this.props.id);
      // this.setState({ showContentForm: false });
    }
  }

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
    if (this.inputContent) {
      this.inputContent.current.value = "";
    }
    this.setState({ showContentForm: !this.state.showContentForm });
  };
  showContentFormHandler = () => {
    this.setState({ showContentForm: !this.state.showContentForm });
  };

  handleData = (data) => {
    this.setState({ content: data });
    console.log("On dataPage :", data);
  };
  render() {
    return (
      <div className={classes.row}>
        <div className={classes.column1}>
          <div className={classes.AddButton}>
            <button
              onClick={this.showContentFormHandler}
              className="btn btn-link"
            >
              ADD: {this.props.subMenuName.toUpperCase()}
            </button>
          </div>
        </div>
        <div className={classes.column2}>
          {this.state.showContentForm ? (
            <div>
              Question:
              <input
                ref={this.inputName}
                type="text"
                className="form-control"
                style={{ width: "300px", margin: "0 auto" }}
              />
              <hr></hr>
              Answer
              {this.state.switchAnswer ? (
                <textarea
                  ref={this.inputContent}
                  type="text"
                  className="form-control"
                  style={{ width: "300px", margin: "0 auto" }}
                />
              ) : (
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.content,
                    }}
                  />
                  <RichTextBox handleData={this.handleData}></RichTextBox>
                </div>
              )}
              <hr></hr>
              <button className="btn btn-warning" onClick={this.handleSave}>
                Save
              </button>
            </div>
          ) : (
            <div className={classes.MainContent}>
              {this.props.contentError ? (
                this.props.contentError.message
              ) : (
                <div
                  style={{
                    overflow: "auto",
                    height: "400px",
                  }}
                >
                  <table className="table">
                    {this.props.subMenuContent.map((item) => {
                      return (
                        <tr key={item._id}>
                          <td style={{ textAlign: "left" }}>
                            <strong>{item.name}</strong>
                            <hr></hr>
                            <p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.value,
                                }}
                              />
                            </p>
                            <div
                              style={{
                                backgroundColor: "royalblue",
                                height: "4px",
                                width: "100%",
                              }}
                            ></div>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentError: state.home.contentError,
    subMenuContent: state.home.subMenuContent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubMenuContentLoad: (id) => dispatch(actions.loadSubMenuContent(id)),
    onContentAdded: (id, name, value) =>
      dispatch(actions.addContent(id, name, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubMenuContent);
