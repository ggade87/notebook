import React, { Component } from 'react';
import classes from './MainMenu.module.css';
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class MainMenu extends Component {
    state = {
      };
    onMenuClick = (menuRequest) => {
      this.props.onMenuClick(menuRequest);
    };
    componentDidMount() {
        this.props.onInitMainMenu();
      }  
    scroll = (x,y) => {
      var id = document.getElementById("sDiv")
      id.scrollBy(x,y);;
    }

    render() { 
      return (<React.Fragment>
          <div className={classes.main}>
            <div className={classes.row}>
            <div className={classes.columnL}  >
              <button id="leftButton" onClick={() => this.scroll(-100,0)} style={{border:"none",backgroundColor:"transparent"}}>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                      <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
              </button>   
            </div>
            <div className={classes.columnM} >
            <div id="sDiv" className={ classes.container }>
                    {this.props.mainMenu && this.props.mainMenu.length > 0
                            ? this.props.mainMenu.map((item,index) => {
                                return (
                                  <button className={[classes.item,"btn btn-link"].join(" ")}   key={item._id} onClick={() => this.onMenuClick({id:item._id,name: item.name}) } >
                                      {item.name}
                                  </button>
                                );
                              })
                            : "Please add new menu"
                      }
              </div> 
            </div>
            <div className={classes.columnR}  >
            <button onClick={() => this.scroll(100,0)} style={{border:"none",backgroundColor:"transparent"}}>
                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                      <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  
                  </button> 
            </div>
          </div>

      </div>
      </React.Fragment>  );
  }
}
 
const mapStateToProps = (state) => {
    return {
      mainMenu: state.home.mainMenu,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onInitMainMenu: () => dispatch(actions.fetchMainMenu()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
  


