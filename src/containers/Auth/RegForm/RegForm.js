import React from "react";
import classes from "./RegForm.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
class RegForm extends React.Component {
  state = {
    username:"",
    password:"",
    conpassword:"",
    validationResult:{
        emailValidation:"",
        passwordValidation:"",
        conPasswordValidation:""
    }
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }
  usernameVal =() => {
    let emailValidation="";
    let userName=this.state.username.trim();
    if(!userName){
      emailValidation="User name required.";
    }else if(!userName.includes("@")){
      emailValidation="Invalid email address.";
    }else
    {
        emailValidation=""
    }
    const validationResult ={
      emailValidation,
      passwordValidation:this.state.passwordValidation,
      conpasswordValidation:this.state.conpasswordValidation
    }
    this.setState({validationResult})
    return emailValidation;
}
 passwordVal =() => {
  let passwordValidation="";
  let password = this.state.password.trim();
    if(!password){
      passwordValidation="Password is required.";
     
    }else if(password.length < 5 || password.length > 10){
        passwordValidation="Invalid password.";
      }
      else{passwordValidation=""}
    const validationResult ={
      emailValidation:this.state.emailValidation,
      passwordValidation,
      conpasswordValidation:this.state.conpasswordValidation 
    }
    this.setState({validationResult})
    return passwordValidation;
 }

 conpasswordVal =() => {
    let conpasswordValidation="";
    let password = this.state.conpassword.trim();
      if(!password){
        conpasswordValidation="Password is required.";
       
      }else if(this.state.password !== password){
        conpasswordValidation="Password not matching.";
      }
      else{conpasswordValidation=""}
      const validationResult ={
        emailValidation:this.state.emailValidation,
        passwordValidation:this.state.passwordValidation,
        conpasswordValidation 
      }
      this.setState({validationResult})
      return conpasswordValidation;
   }
 validate =() => {
  let emailValidation=this.usernameVal();
  let passwordValidation=this.passwordVal();
  let conpasswordValidation=this.conpasswordVal();
    if(emailValidation || passwordValidation || conpasswordValidation){
      const validationResult ={
        emailValidation,
        passwordValidation,
        conpasswordValidation
      }
      this.setState({validationResult})
      return false;
    }
    return true;
 }
  handleInputChange = (event) => {
      this.setState({[event.target.name] :event.target.value});
  };
  handleChange = (event,newValue) => {
    this.setState({value :newValue});
  };
  signup = () => {
    const isValid= this.validate();
    if(isValid){
      this.props.onAuth(
        this.state.username,
        this.state.password,
        true
      ); 
    }
  };
  componentWillUnmount() {
    this.props.onUnmount();
}
  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
      <div>
        <div className={classes.Form}>
        <div className={this.props.error?classes.ErrorMessage:""}> {errorMessage}</div>
        <div className={classes.popup}>
            <TextField  onKeyUp={this.usernameVal}  type="email"  name="username" value={this.state.username} onChange={this.handleInputChange} required id="standard-required" label="Username" />
            <label className={[classes.popuptext,this.state.validationResult.emailValidation?classes.show:""].join(" ")}>{this.state.validationResult.emailValidation}</label>
        </div> 
        <div className={classes.popup}>
            <TextField  onKeyUp={this.passwordVal}   type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required id="standard-required" label="Password" />
            <label  className={[classes.popuptext,this.state.validationResult.passwordValidation?classes.show:""].join(" ")}>{this.state.validationResult.passwordValidation}</label>
        </div>
        <div className={classes.popup}>
            <TextField  onKeyUp={this.conpasswordVal}   type="password" name="conpassword" value={this.state.conpassword} onChange={this.handleInputChange} required id="standard-required" label="Re-enter password" />
            <label  className={[classes.popuptext,this.state.validationResult.conpasswordValidation?classes.show:""].join(" ")}>{this.state.validationResult.conpasswordValidation}</label>
        </div>
        <button  className={["btn btn-primary",classes.Button].join(" ")}    onClick={this.signup} >Sign Up</button>
        </div >
      </div> </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUnmount: () => dispatch(actions.setErrorNull()),
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);


 