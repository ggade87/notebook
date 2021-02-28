import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import MainMenuContent from "./../../../components/content/mainMenuContent";
import backImage from "../../../assets/images/slide-3.jpg";
import classes from "./Home.module.css";
import HomePage from "./../../../components/HomePage/HomePage";
import SearchBox from "../../../components/SearchBox/SearchBox";
import MainMenu from '../../../components/Common/MainMenu/MainMenu'
import Content from '../../../components/Common/Content/Content'
class Home extends Component {
  state = {
    showMenu: false,
    showForm: false,
    menu: "",
    id: 0,
  };
  constructor() {
    super();
    this.inputName = React.createRef();
   
  }
  componentDidMount() {
    this.props.onInitMainMenu();
    const{id} = this.props.match.params;
    if(id !== undefined && id !== ""){
      //when add submenu
      this.setState({showMenu:true,id:id,menu:"Ganesh"});
    }
  }
  handleMenuClick = (menuRequest) => {
    this.setState({showMenu:true,id: menuRequest.id, menu: menuRequest.name });
  };
  componentDidUpdate (prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({ showMenu: false, id: 0, menu: ""});//take back to home page
    }
}
  render() {
    return (
      <div className={classes.MainContainer}>
          <div className={classes.MainMenu}>
            {this.props.isAuthenticated ? (
              <React.Fragment>
                <div className={classes.MainMenuDiv}>
                  <MainMenu onMenuClick={this.handleMenuClick}></MainMenu>
                </div>
                <div className={classes.MainContent}>
                  {this.state.showMenu ? (
                  <Content menuName={this.state.menu} id={this.state.id}></Content>
                  ) : (
                    <div style={{width:"100%",margin:"0 auto",marginTop:"40px"}}>
                       <SearchBox></SearchBox>
                    </div>
                     /*<img src={backImage} alt='Loading' className={classes.BackImage}></img>*/ 
                  )}
                </div>
              </React.Fragment>
            ) : (
              <HomePage></HomePage>
            )}
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mainMenu: state.home.mainMenu,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitMainMenu: () => dispatch(actions.fetchMainMenu()),
    onMenuAdded: (menu) => dispatch(actions.addNewMainMenu(menu)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
