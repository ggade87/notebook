import React from 'react';
import classes from './SubMenuForm.module.css';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions/index";
class SubMenuForm extends React.Component {
    state = {  }
    constructor() {
      super();
      this.inputName = React.createRef();
    }
    handleSave = (e) => {
      e.preventDefault();
      if (this.inputName.current.value.trim() !== ""){
        //this.props.onSubMenuAdded(this.props.match.params.id, this.inputName.current.value);
        this.props.onSubMenuAdded(this.props.id, this.inputName.current.value);
        this.props.onClosePopup();
        this.inputName.current.value = "";
          //this.props.history.goBack();
          //this.props.history.push(`/backHome/${this.props.match.params.id}`);
        
      }else{
          alert("Please enter menu")
      }
    };
    handleCancel= (e) => {
      this.props.onClosePopup();
   // this.props.history.goBack();
     // this.props.history.push('/');
    };
    render() { 
        return (<div>
          <div className={classes.formDiv}>
            <div className="card">
              <div className="card-header">Create Sub Menu for {this.props.name}{/*this.props.match.params.mainMenuName*/}</div>
              <div className="card-body">
                <form>
                  <div className="form-group row">
                    <div className="col-sm-2">Menu</div>
                    <div className="col-sm-10">
                      <input
                        ref={this.inputName}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <button
                        className="btn btn-primary"
                        onClick={this.handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={this.handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> );
    }
}
const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.token !== null,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onSubMenuAdded: (id, subMenuName) =>
      dispatch(actions.addSubMenu(id, subMenuName)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SubMenuForm);
  