import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./SubMenuContent.module.css";
import RichTextBox from "./../RichTextBox/RichTextBox";

import Popup from 'reactjs-popup';
//Uncomment for popup import 'reactjs-popup/dist/index.css';
 
class SubMenuContent extends Component {
  state = { showContentForm: false, switchAnswer: false, content: "",id:"",newName:"" };
  constructor() {
    super();
    this.inputName = React.createRef();
    this.inputContent = React.createRef();
    this.inputEditName = React.createRef();
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
    if (this.inputContent.current) {
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

  handleDelete = (id,name) => {
    //Delete main menu - Delete Content -> Delete Sub Menues -> Delete Main Menu.
    if(window.confirm('Are you sure to delete this record?')){
        console.log('Code for Delete',id,name);
        this.props.onContentDelete(id);
    } 
  }

  handleEdit= (id) => {
    if(window.confirm('Are you sure to edit this record?')){
      if(this.state.content){
        alert(this.state.content)
        alert(id)
        this.props.onContentUpdate(id,this.inputEditName.current.value,this.state.content);
      }else{
        alert("No change")
      }
     this.setState({content:""})
      console.log('Code for Edit');
      
    } 
  }
  change = (event) => {
    this.setState({[event.target.newName]:event.target.value})
}
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
                  <tbody>
                    {this.props.subMenuContent.map((item, index) => {
                      return (
                       
                        <tr key={item._id}>
                          <td style={{ textAlign: "left" }}>
                          <div className="form-row">
                            <div className="col-9">
                                {index + 1}. <strong>{item.name}</strong>  
                            </div>
                            <div className="col">
                                <div>
                                <Popup trigger={
                                      <button   style={{color:"green"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Edit">
                                      <svg width="1em" height="1em" viewBox="0 0 16 16" className ="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                          </svg>
                                      </button>
                                    }
                                    position="left top"  nested   style={{width:"auto"}} closeOnDocumentClick
                                  >
                                     {close => ( 
                                    <div style={{width:"100%",backgroundColor:"#33A4FF",border: "3px solid #f1f1f1"}}>
                                    <strong>{item.name}</strong>  
                                    <input name="newName" ref={this.inputEditName} onChange={this.change} type="text" value={item.name}></input>
                                    <br></br>
                                      <RichTextBox value={item.value} handleData={this.handleData}></RichTextBox>
                                    <br></br>
                                      <button  onClick={() =>  {  close(); this.handleEdit(item._id,item.name)}} style={{color:"green"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Save">Save</button>
                                    </div>
                                    )}
                                  </Popup>
                                    /
                                    <button onClick={() => this.handleDelete(item._id,item.name)}  style={{color:"red"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Delete">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button> </div>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="col"> 
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.value,
                                  }}
                                />
                            </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                     </tbody>
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
    onContentAdded: (id, name, value) => dispatch(actions.addContent(id, name, value)),
    onContentDelete: (id) => dispatch(actions.onContentDelete(id)),
    onContentUpdate: (id,name,value) => dispatch(actions.onContentUpdate(id,name,value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubMenuContent);
