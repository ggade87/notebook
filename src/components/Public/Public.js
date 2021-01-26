import React, { Component } from 'react';
import classes from './Public.module.css'
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import RichTextDisplay from '../../components/RichTextBox/RichTextDisplay/RichTextDisplay';

class Public extends Component {
    state = {  }
    componentDidMount() {
        const {id,type} = this.props.match.params;
        if(type === "all"){
            this.props.onSubMenuContentLoad(id);
        }else if(type === "single"){
            this.props.onSubMenuContentById(id);
        }
      }

      
    render() { 
        const {  type} = this.props.match.params;
        return (<React.Fragment>
            <div className={classes.Public}>
           { /*<a href={`http://localhost:8080/doc?id=${this.props.match.params.id}`}  >Download</a>*/}
           {type !== "single"? 
            <div id="topDiv" className={classes.items}  >
           <strong> Index </strong>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.subMenuContent.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <th scope="row">{index+1}.</th>
                                    <td style={{float:"left"}}> <a href={"#"+index}>{item.name}</a> </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
           </div>:""} 
            {this.props.subMenuContent.map((item, index) => {
                        return (
                            <div className={classes.items} style={{padding:"30px"}} key={item._id}>
                                 <div className={classes.header} id={index}>
                                        <strong>  {index + 1}.{item.name}</strong>  
                                  </div>
                                  <div className={classes.content} >
                                            <RichTextDisplay editorStateProp={  item.value  }></RichTextDisplay>
                                   </div>
                                   {this.props.match.params.type === "all" ? 
                                   <div className={classes.footer} >
                                    <strong>
                                        <a href="#topDiv">
                                            <g-emoji className="g-emoji" alias="arrow_up" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2b06.png">⬆</g-emoji>
                                        Back to Top
                                        </a>
                                    </strong>
                                    </div>:""}
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>  );
    }
}
 


const mapStateToProps = (state) => {
    return {
      subMenuContent: state.home.subMenuContent,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onSubMenuContentLoad: (id) => dispatch(actions.loadSubMenuContent(id)),
      onSubMenuContentById: (id) => dispatch(actions.loadContentById(id)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Public);
  