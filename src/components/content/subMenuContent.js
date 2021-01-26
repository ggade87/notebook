import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./SubMenuContent.module.css";

import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
//Uncomment for popup import 'reactjs-popup/dist/index.css';
import {CompositeDecorator,convertToRaw,convertFromHTML, Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState, convertFromRaw } from "draft-js";
import RichTextDisplay from '../RichTextBox/RichTextDisplay/RichTextDisplay';
import ContentForm from '../../components/Common/Forms/ContentForm/ContentForm'
class SubMenuContent extends Component {
  state = { showContentForm: false, switchAnswer: false, content: "",id:"",newName:"" };
  constructor(props) {
    super(props);
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

  handleSave = (id) => {
     
    this.setState({ showContentForm: !this.state.showContentForm });
    this.props.onSubMenuContentLoad(id);
  };
  showContentFormHandler = () => {
    this.setState({ showContentForm: !this.state.showContentForm });
  };

  handleData = (data) => {
  
    this.setState({ content: data });
  };

  handleDelete = (id,name) => {
    //Delete main menu - Delete Content -> Delete Sub Menues -> Delete Main Menu.
    if(window.confirm('Are you sure to delete this record?')){
        console.log('Code for Delete',id,name);
        this.props.onContentDelete(id);
    } 
   
  }

  handleEdit= (id,name) => {
    this.props.onSubMenuContentLoad(this.props.id);
    this.setState({content:""})
    /*
    if(window.confirm('Are you sure to edit this record?')){
      if(this.state.content){
        this.props.onContentUpdate(id,this.inputEditName.current.value,this.state.content);
      }else{
      }
     this.setState({content:""})
      console.log('Code for Edit');
     
    }  */
  }
  change = (event) => {
    this.setState({[event.target.newName]:event.target.value})
}

handleEdt = (data) =>{
  this.props.history.push('/dresses?id='+data);
}

display= (data) =>{
 /* const blocksFromHTML = convertFromHTML(data);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
     const editorState =EditorState.createWithContent(state);
  
    const rawDraftContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()) );
    console.log(rawDraftContentState);  
    const blocksFromHTML =   convertFromRaw(JSON.parse(data)) ;
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
     const editorState =EditorState.createWithContent(blocksFromHTML); */
     const blocksFromHTML =   convertFromRaw(data) ;
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
     const editorState =EditorState.createWithContent(blocksFromHTML);
  return data;
}
 
  render() {
    return (
      <div className={classes.row}>
          {this.state.showContentForm ? (
            <ContentForm id={this.props.id} handleSave={this.handleSave} close={this.showContentFormHandler}></ContentForm>
          ) : (
            <div className={classes.MainContent}>
               <div className={[classes.row2,classes.ContentControl].join(' ')}>
                    <div className={classes.AddButton}>
                        <button
                          onClick={this.showContentFormHandler}
                          className={classes.AddButtonStyle}
                        >
                          New : {this.props.subMenuName.toUpperCase()}
                        </button>
                      </div>
                      <Link to={`/data/${this.props.id}/all`} >Details</Link>
                 </div>
                 <div className={classes.row2}>
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
                          { /*<GridComponent dataSource={this.props.subMenuContent}>
                                <ColumnsDirective>
                                  <ColumnDirective field='name' width='100' textAlign="Right"/>
                                  <ColumnDirective field='value'  headerText='Answer'  />
                                </ColumnsDirective>
                              </GridComponent>*/}
                            {this.props.subMenuContent.map((item, index) => {
                              return (
                              
                                <tr key={item._id}>
                                  <td style={{ textAlign: "left" }}>
                                  <div className="form-row">
                                    <div className="col-9">
                                    
                                        {index + 1}. <strong><Link to={`/data/${item._id}/single`} >{item.name}</Link></strong>  
                                    </div>
                                    <div className="col">
                                        <div>
                                      
                                        {/*<Popup trigger={
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
                                            <EditContentForm editId={item._id} clickUpdate={() =>  {  close(); this.handleEdit(item._id,item.name)}}></EditContentForm>
                                            <br></br>
                                              <button  onClick={() =>  {  close(); this.handleEdit(item._id,item.name)}} style={{color:"green"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Save">Save</button>
                                            </div>
                                            )}
                                            </Popup>*/}
                                            <Link to={`EditContentForm/${item._id}`} style={{color:"green"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Edit">
                                              <svg width="1em" height="1em" viewBox="0 0 16 16" className ="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                              </svg>
                                      </Link>
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
                                    <RichTextDisplay editorStateProp={  item.value  }></RichTextDisplay>
                                    {/*<Editor   editorState={ EditorState.createWithContent(convertFromRaw(JSON.parse(item.value))) }  />*/}
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
            </div>
          )}
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
