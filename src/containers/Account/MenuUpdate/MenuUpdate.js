import React from "react";
import classes from "./MenuUpdate.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
class MenuUpdate extends React.Component {
    state={
        selectValue:""
    }
    componentDidMount() {
        this.props.onInitMainMenu();
      }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({selectValue:e.target.value});
        this.props.onSubMenuLoad(e.target.value);
    } 
    render(){
        return <div className={classes.MenuUpdate}>  
        {this.props.menuType === 'MainMenu' ? <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Menu</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {this.props.mainMenu && this.props.mainMenu.length > 0
                        ?
                         this.props.mainMenu.map((item) => {
                            return (
                                    <tr>
                                        <td>
                                    <div
                                        className="nav-item"
                                        key={item._id}
                                        style={{
                                            padding: "6px",
                                        }}
                                    >
                                        {item.name}
                                    </div>  </td>
                                    <td>
                                    <button style={{color:"green"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Edit">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>/
                                    <button style={{color:"red"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Delete">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>  
                                    </td>
                                    </tr>  
                            );
                            })
                        : <tr><td> Please add new menu </td></tr>}
                         </tbody>
                        </table>
             </div> : 
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">
                            <select name="cars" id="cars"  value={this.state.selectValue} 
                                onChange={this.handleChange}  className="custom-select" style={{width:"30%"}}
                                >
                            <option value="">--Select Menu--</option>
                                {this.props.mainMenu && this.props.mainMenu.length > 0
                                ? this.props.mainMenu.map((item) => {
                                    return (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    );
                                    })
                                : ""}
                            </select>
                        </th>
                        <th scope="col">
                            </th>
                        </tr>
                    </thead>
                    <tbody> 
                        {this.props.error
                        ? this.props.error.message
                        : this.props.subMenu.map((item) => {
                            return (
                                    <tr>
                                        <td>
                                    <div
                                        className="nav-item"
                                        key={item._id}
                                        style={{
                                            padding: "6px",
                                        }}
                                    >
                                        {item.name}
                                    </div>  
                                    </td>
                                    <td>
                                    <button style={{color:"green"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Edit">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>/
                                    <button style={{color:"red",fontWeight:"bold"}} className="btn btn-link" data-toggle="tooltip" data-placement="top" title="Delete">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button> </td>
                                    </tr>
                            );
                            })}
                    </tbody>
                </table>
            </div>
        }  </div>
    }
}

const mapStateToProps = (state) => {
    return {
      mainMenu: state.home.mainMenu,
      isAuthenticated: state.auth.token !== null,
      subMenu: state.home.subMenu,
      error: state.home.error,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onInitMainMenu: () => dispatch(actions.fetchMainMenu()),
      onSubMenuLoad: (id) => dispatch(actions.fetchSubMenu(id)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(MenuUpdate);
  