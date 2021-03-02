import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./containers/Auth/Home/Home";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import Account from "./containers/Account/Account";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import EditContentForm from './components/content/EditContentForm/EditContentForm';
import MainMenuForm from './components/Common/Forms/MainMenuForm/MainMenuForm';
import SubMenuForm from './components/Common/Forms/SubMenuForm/SubMenuForm';
import Public from './components/Public/Public';
class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignup(); //Redirect login when page refresh
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth}></Route>
        <Route path="/auth" exact component={Auth}></Route>
        <Route path="/Contact" component={Contact}></Route>
        <Route path="/About" component={About}></Route>
        <Route path="/data/:id/:type" component={Public}></Route>
        <Route path="/" exact component={Home}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/Home" component={Home}></Route>
          <Route path="/MainMenuForm" component={MainMenuForm}></Route>
          <Route path="/SubMenuForm/:id/:mainMenuName" component={SubMenuForm}></Route>
          <Route path="/Account" component={Account}></Route>
          <Route path="/Contact" component={Contact}></Route>
          <Route path="/About" component={About}></Route>
          <Route path="/data/:id/:type" component={Public}></Route>
          <Route path="/EditContentForm/:id" component={EditContentForm}></Route>
          <Route path="/logout" exact component={Logout}></Route>
         { /*<Route path="/backHome/:id" exact component={Home}></Route>*/}
          <Route path="/" exact  component={Home}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }
    return (
      <div className="App">
        <div style={{display:"contents"}}>
          <Layout> {routes} </Layout>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
