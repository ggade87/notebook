import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import MainMenuContent from "./../../../components/content/mainMenuContent";
import backImage from "../../../assets/images/slide-3.jpg";
import classes from "./Home.module.css";
import HomePage from "./../../../components/HomePage/HomePage";
import SearchBox from "../../../components/SearchBox/SearchBox";
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
  }
  
  handleSave = (e) => {
    e.preventDefault();
    if (this.inputName.current.value.trim() !== "")
      this.props.onMenuAdded(this.inputName.current.value);
    this.inputName.current.value = "";
    this.setState({ showForm: !this.state.showForm });
  };

  onMenuClick = (id, menu) => {
    this.setState({ showMenu: true, id: id, menu: menu });
  };
  showMenuFormHandler = () => {
    this.setState({ showForm: !this.state.showForm });
  };
  componentDidUpdate (prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({ showMenu: false, id: 0, menu: ""});//take back to home page
    }
}
  render() {
    return (
      <div className={classes.MainContainer}>
        {this.state.showForm ? (
          <div className={classes.formDiv}>
            <div className="card">
              <div className="card-header">Menu</div>
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
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.MainMenu}>
            {this.props.isAuthenticated ? (
              <React.Fragment>
                <div className={classes.MainMenuDiv}>
                  <ul className="nav nav-tabs">
                    <li
                      className="nav-item"
                      key={Math.random()}
                      style={{
                        padding: "6px",
                      }}
                    >
                      <button
                        onClick={this.showMenuFormHandler}
                        className={[classes.AddButton, "nav-link"].join(" ")}
                      >
                        NEW
                      </button>
                    </li>
                    {this.props.mainMenu && this.props.mainMenu.length > 0
                      ? this.props.mainMenu.map((item) => {
                          return (
                            <li
                              className="nav-item"
                              key={item._id}
                              style={{
                                padding: "6px",
                              }}
                            >
                              <button
                                className="nav-link active"
                                onClick={() =>
                                  this.onMenuClick(item._id, item.name)
                                }
                              >
                                {item.name}
                              </button>
                            </li>
                          );
                        })
                      : "Please add new menu"}
                  </ul>
                </div>
                <div className={classes.MainContent}>
                  {this.state.showMenu ? (
                    <MainMenuContent
                      menuName={this.state.menu}
                      id={this.state.id}
                    ></MainMenuContent>
                  ) : (
                    <div style={{width:"500px",margin:"0 auto",marginTop:"50px"}}>
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
        )}
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
