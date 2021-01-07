import React, { Component } from 'react';
import classes from './MainMenu.module.css';
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import styled from "styled-components";

import Carousel from "react-elastic-carousel";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 50, itemsToShow: 2 },
  { width: 50, itemsToShow: 3 },
  { width: 50, itemsToShow: 4 },
  { width: 50, itemsToShow: 5 },
  { width: 1000, itemsToShow: 6 }
];
const Item= styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  background-color: #00008B;
  color: #fff;
  margin: 20px 15px 15px 15px;
  font-size: 1em;
  cursor:pointer;
`;
class MainMenu extends Component {
    state = {
        
      };

      onMenuClick = (menuRequest) => {
        this.props.onMenuClick(menuRequest);
      };
    componentDidMount() {
        this.props.onInitMainMenu();
      }
    render() { 
        return (<React.Fragment>
            <div className={classes.MainMenu}>
        <Carousel itemsToShow={7} >
        {this.props.mainMenu && this.props.mainMenu.length > 0
                      ? this.props.mainMenu.map((item) => {
                          return (
                            <Item style={{width:"100%"}}
                              key={item._id} onClick={() =>
                                this.onMenuClick({id:item._id,name: item.name})
                              }
                            >
                            {item.name}
                            </Item>
                          );
                        })
                      : "Please add new menu"}
        </Carousel>
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
  


