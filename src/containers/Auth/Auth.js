import React from "react";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
  
import LoginForm from './LoginForm/LoginForm';
import RegForm from './RegForm/RegForm';
class Auth extends React.Component {
  state = {
    value: 0  
  };

  componentDidMount() {
    // if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }
  
  handleChange = (event,newValue) => {
    this.setState({value :newValue});
  };
 
  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
      <AppBar position="static" className={classes.Tab}>
        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="Notebook Authorization.">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Registration" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div>
      <TabPanel value={this.state.value} index={0}>
        <LoginForm></LoginForm>
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
        <RegForm></RegForm>
      </TabPanel>
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
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
