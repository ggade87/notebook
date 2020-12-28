import React, { Component } from 'react';
import classes from './AutoCompleteText.module.css'
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
class AutoCompleteText extends Component {
    state = { 
        suggestions:[],
        text:""
     }
     onTextChanged = (e) => {
         const {items} = this.props;
         const value = e.target.value;
         let suggestions =[];
         if(value !== ""){
            this.props.onSubMenuContentSearch(value)
            for(var i=0;i< this.props.subMenuContent.length ; i++){
               suggestions.push(this.props.subMenuContent[i].name)
            }
         }
        
        /* if(value.length > 0){ 
            const regex = new RegExp(`^${value}`,'i');
            suggestions = items.sort().filter(v => regex.test(v));
         }*/
         this.setState(() => ({suggestions,text:value}));
     }
     suggestionsSelected(value){
         const content = [...this.props.subMenuContent]
         const filteredContent = content.filter(x=> x.name === value);
         this.props.onSearch(filteredContent);
         this.setState(() => ({text:value,suggestions:[]}));
     }
     renderSuggestions() {
         const {suggestions} = this.state;
         if(suggestions !== undefined && suggestions.length === 0){ 
             return null;
         }
         return (<ul>
            {suggestions !== undefined ? suggestions.map((item,index) => <li key={index} onClick={() => this.suggestionsSelected(item)}>{item}</li>): ""}
        </ul>)
     }

     componentDidUpdate(nextProps) {
        const { subMenuContent } = this.props
        if (nextProps.subMenuContent !== subMenuContent) {
         if (subMenuContent) {
            let suggestions =[];
            for(var i=0;i< this.props.subMenuContent.length ; i++){
                suggestions.push(this.props.subMenuContent[i].name)
               
             }
             this.setState(() => ({suggestions}));
         }
        }
       }
    render() { 
        const {text} = this.state;
        return ( <div className={classes.AutoCompleteText}>
                    <input  type="text" value={text} onChange={this.onTextChanged} ></input>
                        {this.renderSuggestions()}
                </div> );
    }
}
 

const mapStateToProps = (state) => {
    return {
      subMenuContent: state.home.subMenuContent,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onSubMenuContentSearch: (search) => dispatch(actions.searchSubMenuContent(search)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteText);
  