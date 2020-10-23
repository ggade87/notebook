import React  from "react";
import classes from "./PersonalDetails.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
class PersonalDetails extends React.Component {
    state= {
        changePassword:false,
        file:"",
        base64:"",
        user:this.props.User ,
        password:"",
        confirmPassword:""
    }

    componentDidMount() {
        this.props.loadImage();
        this.props.loadUser();
    }

    onInputchange = (event) => {
        const data=event.target.name;
        const user= {...this.state.user}
        user[data]=event.target.value;
        this.setState({user})
    }

    onPasswordInputchange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }


    handleUserSave = () => {
        const User = {
            "name":this.state.user.name,
            "Mobile": this.state.user.Mobile,
            "profession":this.state.user.profession,
        }
        this.props.updateUser(User);
        
    }
    showPasswordResetHander = () =>{
        this.setState({password:"",confirmPassword:"",changePassword:!this.state.changePassword})
    }

    resetPasswordHandler = () =>{
        console.log(this.state.password )
        console.log(this.state.confirmPassword )
        if(this.state.password === ""){
            alert("Password filed is required.")
            return false;
        }else if(this.state.password.length < 6){
            alert("Password should be greater than 6 digits.")
            return false;
        }else if(this.state.password !==  this.state.confirmPassword){
            alert("Password dont match!")
            return false;
        }
        this.props.updatePassword(this.state.password);
        
    }
    
    handleImageSelect = (event) => {
         event.preventDefault();
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({
            file: reader.result,
            base64: reader.result,
          });
        };
    }

    uploadFile = () => {
        this.props.onUpload(this.state.base64);
    } 

    componentDidUpdate(prevProps, prevState){
        if (this.props.User !== prevProps.User) {
            this.setState({user:this.props.User })
          }
        if(this.props.message !== prevProps.message){ 
            if(this.props.message  !== ""){
            alert(this.props.message)
            }
        }
           
        if(this.props.updatePasswordFlag !== prevProps.updatePasswordFlag){ 
            if(this.props.updatePasswordFlag){
                alert("Password reset successfuly.")
                this.setState({changePassword:!this.state.changePassword});
            }
        }
    }
  
    render(){
        return <div className={classes.PersonalDetails}>
            {!this.state.changePassword ? 
            <React.Fragment>
                {this.props.User.email !== "" ?
                <table className="table  table-bordered table-sm">
                    <thead>
                        <tr>
                            <th scope="col">
                            {this.props.file
                                ? this.props.file.map((item, index) => {
                                    return (
                                    <div key={index}  >
                                        {item.file ? (
                                        <img className={[classes.imageCss,"rounded mx-auto d-block"].join(" ")} alt="Loading." src={item.file} />
                                        ) : (
                                        ""
                                        )}
                                    </div>
                                    );
                                })
                            : "Loading....."}
                            </th>
                            <th scope="col"> 
                            <input className="float-left btn  btn-outline-secondary"  type="file" onChange={this.handleImageSelect}></input>
                            <button className="float-left btn btn-link"  onClick={this.uploadFile} disabled={this.props.loading}>  Upload</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row"> Name</th>
                        <td><input style={{width:"50%"}} className="form-control" name="name" type='text' value={this.state.user.name}  onChange={this.onInputchange} ></input></td>
                    </tr>
                    <tr>
                        <th scope="row">Email </th>
                        <td><input  style={{width:"50%"}} className="form-control" name="email" type='text' value={this.state.user.email} disabled={true}></input></td>
                    </tr>
                    <tr>
                        <th scope="row">Mobile </th>
                         <td><input style={{width:"50%"}} className="form-control" name="Mobile" type='text'value={this.state.user.Mobile} onChange={this.onInputchange}></input></td>
                    </tr>
                    <tr> <th scope="row"> Profession</th>
                         <td><input style={{width:"50%"}} className="form-control" name="profession" type='text' value={this.state.user.profession} onChange={this.onInputchange}></input></td>
                    </tr>
                    <tr>
                        <th scope="row"> </th>
                        <td><button className="btn btn-link float-left" onClick={this.showPasswordResetHander}>Change Password</button></td>
                    </tr>
                    <tr>
                        <th scope="row"> </th>
                         <td><button className="btn btn-primary float-left"  onClick={this.handleUserSave} disabled={this.props.loading}> Save</button></td>
                    </tr></tbody>
                </table> :"Lading..."}
            </React.Fragment> :
            <table className="table  table-bordered table-sm"><tbody>
                <tr>
                <th scope="row"> New Password</th> <td><input style={{width:"50%"}} className="form-control" name="password" value={this.state.password} type='password' onChange={this.onPasswordInputchange}></input></td>
                </tr>
                <tr>
                <th scope="row"> Confirm Password</th>  <td><input style={{width:"50%"}} className="form-control" name="confirmPassword" value={this.state.confirmPassword}  type='password' onChange={this.onPasswordInputchange}></input></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button className="btn btn-link float-left"  onClick={this.resetPasswordHandler}>SAVE</button>
                        <button className="btn btn-link float-left"  onClick={this.showPasswordResetHander}>CANCEL</button>
                    </td>
                </tr></tbody>
            </table>
            }
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
      file: state.home.file,
      error: state.home.error,
      isAuthenticated: state.home.token !== null,
      loading: state.home.loading,
      User: state.home.User,
      message: state.home.message,
      updatePasswordFlag: state.home.updatePasswordFlag,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        onUpload: (file) => dispatch(actions.uploadfile(file)),
        loadImage: () => dispatch(actions.loadImage()),
        updateUser: (User) => dispatch(actions.updateUser(User)),
        loadUser: () => dispatch(actions.loadUser()),
        updatePassword: (newPassword) => dispatch(actions.updatePassword(newPassword)),
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
  