import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import SubMenuContent from "./subMenuContent";
import classes from "./MainMenuContent.module.css";
class MainMenuContent extends Component {
  state = { showSubMenu: false, id: 0, name: "", showSubForm: false };
  constructor() {
    super();
    this.inputName = React.createRef();
  }
  componentDidMount() {
    this.props.onSubMenuLoad(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ showSubMenu: false, id: 0, name: "" });
      this.props.onSubMenuLoad(this.props.id);
    }
  }
  onSubMenuClick = (id, subMenuName) => {
    this.setState({ showSubMenu: true, id: id, name: subMenuName });
  };
  handleSave = (e) => {
    e.preventDefault();
    if (this.inputName.current.value.trim() !== "")
      this.props.onSubMenuAdded(this.props.id, this.inputName.current.value);
    this.inputName.current.value = "";
    this.setState({ showSubForm: !this.state.showSubForm });
  };

  showSubMenuFormHandler = () => {
    this.setState({ showSubForm: !this.state.showSubForm });
  };
  render() {
    return (
      <div style={{ margin: "0 auto" }}>
        {this.state.showSubForm ? (
          <div className={classes.formDiv}>
            <div className="card">
              <div className="card-header">Sub Menu</div>
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
                    onClick={this.showSubMenuFormHandler}
                    className={[classes.AddButton, "nav-link"].join(" ")}
                  >
                    NEW : {this.props.menuName.toUpperCase()}
                  </button>
                </li>
                {this.props.error
                  ? this.props.error.message
                  : this.props.subMenu.map((item) => {
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
                              this.onSubMenuClick(item._id, item.name)
                            }
                          >
                            {item.name}
                          </button>
                        </li>
                      );
                    })}
              </ul>
            </div>
            <div className={classes.MainContent}>
              {this.state.showSubMenu ? (
                <SubMenuContent
                  subMenuName={this.state.name}
                  id={this.state.id}
                ></SubMenuContent>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.home.error,
    subMenu: state.home.subMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubMenuLoad: (id) => dispatch(actions.fetchSubMenu(id)),
    onSubMenuAdded: (id, subMenuName) =>
      dispatch(actions.addSubMenu(id, subMenuName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuContent);
