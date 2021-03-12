import React from 'react';
import RichTextBox from "./../../RichTextBox/RichTextBox";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Redirect from 'react-dom'
import {CompositeDecorator,convertToRaw,convertFromHTML, Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState, convertFromRaw } from "draft-js";
const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a rel="nofollow noreferrer" href={url} target="_blank">
      {props.children}
    </a>
  );
};
const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);
class EditContentForm extends React.Component {
    state = {content:"",inputVal:this.props.editableContent.name}
    constructor(props) {
        super(props);
        this.inputName = React.createRef();
        this.inputContent = React.createRef();
         
      }
 componentDidMount()  {
   if(this.props.editId !==  undefined && this.props.editId !== ""){
    this.props.onSubMenuContentLoadById(this.props.editId)
   }else{
    this.props.onSubMenuContentLoadById(this.props.match.params.id)
   }
  
  if(this.props.editableContent.name) alert(this.props.editableContent.name)
 
 }

 componentDidUpdate(prevProps, prevState){
  if (this.props.editableContent !== prevProps.editableContent) {
      this.setState({inputVal:this.props.editableContent.name })
    }
  }

    handleUpdate = () => {
        const { history } = this.props;
        var id;
        if(this.props.editId !==  undefined && this.props.editId !== ""){
          id = this.props.editId;
        }else{
          id = this.props.match.params.id;
        }
        if(this.state.content !== ""){
          this.props.onContentUpdate(id,this.state.inputVal,this.state.content)
        }else{
          this.props.onContentUpdate(id,this.state.inputVal,this.props.editableContent.value)
        }
        if( this.props.editId ===  undefined || this.props.editId === ""){
          history.push('/');
        }else{
          this.props.clickUpdate();
        }
    }

    handleChange = (e) => {
      this.setState({inputVal:e.target.value});
    } 
    getState = () => {
      this.setState({inputVal:this.props.editableContent.name});
    }
    handleData = (data) => {
        this.setState({ content: data });
        console.log("On dataPage :", data);
      };
    componentWillUnmount() {
        this.props.onEditableContentClear();
    }
    render() { 
        return ( <div>
            Question:
            <input ref={this.inputName}
              value={this.state.inputVal} 
              onChange={this.handleChange}
              onLoadCapture={this.getState}
              type="text"
              className="form-control"
              style={{ width: "80%", margin: "0 auto" }}
            />
            <hr></hr>
           
              <div  style={{ width: "80%", margin: "0 auto" }}>
                {this.props.editableContent.value ? <RichTextBox value={ this.props.editableContent.value }  handleData={this.handleData}></RichTextBox>
             : "" } </div>
            
            <hr></hr>
            <button className="btn btn-warning" onClick={this.handleUpdate}>
              Update
            </button>
          </div>  );
    }
}

   //Link code
   function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }
const mapStateToProps = (state) => {
    return {
        editableContent: state.home.editableContent,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onSubMenuContentLoadById: (id) => dispatch(actions.loadSubMenuContentById(id)),
      onEditableContentClear: () => dispatch(actions.loadEditableContentClear()),
      onContentUpdate: (id,name,value) => dispatch(actions.onContentUpdate(id,name,value)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(EditContentForm);
  