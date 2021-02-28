import React from "react";
import classes from "./LoginForm.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
class LoginForm extends React.Component {
  state = {
    value: 0 ,
    username:"",
    password:"",
    validationResult:{
                emailValidation:"",
                passwordValidation:""
    },
  };

  componentDidMount() {
    // if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
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
      passwordValidation:this.state.passwordValidation
    }
    this.setState({validationResult})
    return emailValidation;
  }

  
  passwordVal =() => {
    let passwordValidation="";
    let password = this.state.password.trim();
      if(!password){
        passwordValidation="Password is required.";
      
      }else{passwordValidation=""}
      const validationResult ={
        emailValidation:this.state.emailValidation,
        passwordValidation 
      }
      this.setState({validationResult})
      return passwordValidation;
  }

  validate =() => {
    let emailValidation=this.usernameVal();
    let passwordValidation=this.passwordVal();
      if(emailValidation || passwordValidation){
        const validationResult ={
          emailValidation,
          passwordValidation
        }
        this.setState({validationResult})
        return false;
      }
      return true;
  }

  handleInputChange = (event) => {
      this.setState({[event.target.name] :event.target.value});
  };

  login = () => {
    const isValid= this.validate();
    this.setState({password:""});
    if(isValid){
      this.props.onAuth(this.state.username,this.state.password,false); 
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
          <TextField  onKeyUp={this.usernameVal} type="email"  name="username" value={this.state.username} onChange={this.handleInputChange} required id="standard-required" label="Username" />
          <label className={[classes.popuptext,this.state.validationResult.emailValidation?classes.show:""].join(" ")}>{this.state.validationResult.emailValidation}</label>
        </div> 
        <div className={classes.popup}>
        <TextField onKeyUp={this.passwordVal}  type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required id="standard-password" label="Password" />
        <label  className={[classes.popuptext,this.state.validationResult.passwordValidation?classes.show:""].join(" ")}>{this.state.validationResult.passwordValidation}</label>
        </div>
        <button className={["btn btn-primary",classes.Button].join(" ")}  onClick={this.login} >Login</button>
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
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);


 