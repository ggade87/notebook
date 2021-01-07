import React, { Component } from 'react';
import classes from './Content.module.css'
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import SubMenuContent from "../../../components/content/subMenuContent";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import SubMenuForm from '../../../components/Common/Forms/SubMenuForm/SubMenuForm'
class Content extends Component {
    state = { flag:false,showSubMenu: false, id: 0, name: "", showSubForm: false,addNewSubMenu:false };
    componentDidMount() {
        this.props.onSubMenuLoad(this.props.id);
      }
    onSubMenuClick = (id, subMenuName) => {
      this.setState({ showSubMenu: true, id: id, name: subMenuName });
    };
    openNav = () => {
        if(this.state.flag === true){
            document.getElementById("mySidebar").style.width = "20%";
            document.getElementById("mySidebar2").style.display = "block";
            document.getElementById("rightSidebar").style.width = "80%";
        }else{
            document.getElementById("mySidebar").style.width = "3%";
           document.getElementById("mySidebar2").style.display = "none";
            document.getElementById("rightSidebar").style.width = "97%";
        }
        this.setState({flag:!this.state.flag})
    }
    componentDidUpdate(nextProps) {
      if(nextProps.id !== this.props.id){
        this.props.onSubMenuLoad(this.props.id);
        this.setState({showSubMenu:false})
      }
      }

    addSubMenu = () => {
      this.setState({showSubMenu:false,addNewSubMenu:true})
    }
    handleSubMenuSave = () => {
      this.setState({showSubMenu:false,addNewSubMenu:false})
    }
    render() { 
        return (
        <React.Fragment>
          <div className={classes.Mainsidebar}>
              <div id="mySidebar"   className={classes.sidebar}>
                <div  className={classes.arrowBtn}  >
                  <button className={classes.openbtn} onClick={this.openNav}>
                      {this.state.flag === true ?
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                          <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                      </svg> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                      </svg>}
                  </button>  
                </div>
                <div id="mySidebar2">
                  <table className="table">
                    <tbody>
                      <tr  key={Math.random()}>
                        <td>
                        <button onClick={this.addSubMenu} className="btn btn-link">Add New</button>
                         {/*  <Popup style={{position:"fixed"}} className={classes.Popup} trigger={<button className="btn btn-link">Add New</button>} position="right center">
                        {close => (  <div>
                            <SubMenuForm onClosePopup={() => {close(); this.props.onSubMenuLoad(this.props.id);}} id={this.props.id} name={this.props.menuName}></SubMenuForm>
                          </div>
                              )}
                        </Popup>
                       
                          Link code is commented coz added popup
                          <Link to={`SubMenuForm/${this.props.id}/${this.props.menuName}`}>
                                Add new      
                        </Link>*/}
                      </td>
                    </tr>
                {this.props.error
                  ? this.props.error.message
                  : this.props.subMenu.map((item) => {
                      return (
                        <tr   key={item._id}>
                        <td>
                          <button style={{width:"100%"}} className="btn btn-link"
                            onClick={() =>
                              this.onSubMenuClick(item._id, item.name)
                            }
                          >
                            {item.name}
                          </button>
                        </td>
                            </tr>
                      );
                    })}
              </tbody>
                          </table>
                    </div>
                </div>
                <div id="rightSidebar"   className={classes.rsidebar}>
                            {this.state.showSubMenu ? (
                            <SubMenuContent
                            subMenuName={this.state.name}
                            id={this.state.id}
                            ></SubMenuContent>
                        ) : (
                              this.state.addNewSubMenu? <SubMenuForm onClosePopup={() => { this.handleSubMenuSave();  this.props.onSubMenuLoad(this.props.id);}} id={this.props.id} name={this.props.menuName}></SubMenuForm>
                              :
                          <   div className="card bg-light mb-3" style={{margin:"0 auto",width:"200px",marginTop:"100px"}}>
                                <div className="card-header"  >{ this.props.menuName}</div>
                              </div>
                         
                        )}
                </div>
             </div>
      </React.Fragment> 
        )
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Content);
  