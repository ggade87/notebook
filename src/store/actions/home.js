import * as actionsTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addMainMenu = (menu, insertedId) => {
  return {
    type: actionsTypes.SET_HOME_MAIN_MENU,
    insertedId: insertedId,
    mainMenu: menu,
  };
};

export const addNewMainMenu = (name) => {
  return (dispatch) => {
    const authData = {
      userId: localStorage.getItem("userId"),
      name: name,
    };
    let url = "http://localhost:8080/addMainMenu";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, authData, {
        headers: headers,
      })
      .then((response) => {
        dispatch(addMainMenu(response.data, response.data.insertedId));
      })
      .catch((err) => {
        if (err.code === 11000) {
        } else if (err.code === 1) {
        }
        //dispatch(authFail(err));
      });
  };
};

export const loadSubMenu = (SubMenu) => {
  return {
    type: actionsTypes.GET_SUBMENUES,
    SubMenu: SubMenu,
  };
};

export const fetchSubMenuFail = (error) => {
  return {
    type: actionsTypes.GET_SUBMENUES_FAILED,
    error: error,
  };
};
export const fetchSubMenu = (id) => {
  return (dispatch) => {
    const data = {
      id: id,
    };
    let url = "http://localhost:8080/getSubMenu";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.error && response.data.error.code > 0) {
          throw response.data.error;
        } else if (!response.data) {
          throw response.data.error;
        }
        dispatch(loadSubMenu(response.data));
      })
      .catch((err) => {
        if (err.code === 1) {
          err.message = "Please add menu.";
        }
        dispatch(fetchSubMenuFail(err));
      });
  };
};

export const loadContentS = (content) => {
  return {
    type: actionsTypes.GET_SUBMENUES_CONTENT,
    subMenuContent: content,
  };
};

export const fetchContentFail = (error) => {
  return {
    type: actionsTypes.GET_CONTENT_FAILED,
    error: error,
  };
};
export const loadSubMenuContent = (id) => {
  return (dispatch) => {
    const data = {
      smid: id,
    };
    let url = "http://localhost:8080/getContent";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.error && response.data.error.code > 0) {
          throw response.data.error;
        } else if (!response.data) {
          throw response.data.error;
        }

        dispatch(loadContentS(response.data));
      })
      .catch((err) => {
        if (err.code === 1) {
          err.message = "Content not available. Please add!";
          dispatch(fetchContentFail(err));
        }
        //(fetchSubMenuFail(err));
      });
  };
};

export const addSubMenuS = (menu, insertedId) => {
  return {
    type: actionsTypes.SET_SUBMENUES,
    insertedId: insertedId,
    subMenu: menu,
  };
};

export const addSubMenu = (id, subMenuName) => {
  return (dispatch) => {
    const authData = {
      mid: id,
      name: subMenuName,
    };
    let url = "http://localhost:8080/addSubMenu";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, authData, {
        headers: headers,
      })
      .then((response) => {
        dispatch(addSubMenuS(response.data, response.data.insertedId));
      })
      .catch((err) => {
        if (err.code === 11000) {
        } else if (err.code === 1) {
        }
        //dispatch(authFail(err));
      });
  };
};

export const getMainMenu = (mainMenu) => {
  return {
    type: actionsTypes.GET_MENUES,
    mainMenu: mainMenu,
  };
};

export const fetchMainMenu = () => {
  return (dispatch) => {
    axios
      .get(
        "http://localhost:8080/getMainMenu?userId=" +
          localStorage.getItem("userId")
      )
      .then((response) => {
        dispatch(getMainMenu(response.data));
      })
      .catch((error) => {
        //dispatch(fetchIngredientsFailed());
      });
  };
};

export const addContentS = (content, insertedId) => {
  return {
    type: actionsTypes.ADD_CONTENT,
    insertedId: insertedId,
    subMenuContent: content,
  };
};
export const addContent = (id, name, value) => {
  return (dispatch) => {
    const authData = {
      smid: id,
      name: name,
      value: value,
    };
    let url = "http://localhost:8080/addConent";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(url, authData, {
        headers: headers,
      })
      .then((response) => {
        dispatch(addContentS(response.data, response.data.insertedId));
      })
      .catch((err) => {
        if (err.code === 11000) {
        } else if (err.code === 1) {
        }
        //dispatch(authFail(err));
      });
  };
};


export const uploadfileSuccess = (id, files) => {
  return {
    type: actionsTypes.UPLOADFILE,
    id: id,
    file: files,
  };
};
export const uploadfileStart = () => {
  return {
    type: actionsTypes.UPLOADFILE_START,
  };
};
export const uploadfileFail = (error) => {
  return {
    type: actionsTypes.UPLOADFILE_FAIL,
    error: error,
  };
};
export const uploadfile = (orderData) => {
  return (dispatch) => {
    dispatch(uploadfileStart()); 
    const authData = {
      imageData: orderData,
      id:localStorage.getItem("userId")
    };
    let url = "http://localhost:8080/addImage";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .put(url, authData, {
        headers: headers,
      })
      .then((response) => {
        console.log('succcess ' ,response)
        dispatch(uploadfileSuccess(response.data.name, response.data));

        return axios.get(
          "http://localhost:8080/getImage?userId=" +
            localStorage.getItem("userId")
        )
      }) 
      .then((response) => {
        console.log(response)
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({
            file: response.data[key].image,
          });
        }
        dispatch(loadfilesSuccess(fetchOrders));
      })
      .catch((err) => {
        dispatch(uploadfileFail(err))
      });
  };
};


export const loadfilesSuccess = (file) => {
  return {
    type: actionsTypes.LOAD_FILE_SUCCESS,
    file: file,
  };
};
export const loadImage = () => {
  return (dispatch) => {
    axios
    .get(
      "http://localhost:8080/getImage?userId=" +
        localStorage.getItem("userId")
    )
    .then((response) => {
      console.log(response)
      const fetchOrders = [];
      for (let key in response.data) {
        fetchOrders.push({
          file: response.data[key].image,
        });
      }
      dispatch(loadfilesSuccess(fetchOrders));
    })
    .catch((error) => {
      console.log(error)
      //dispatch(fetchIngredientsFailed());
    });
  };
};


export const updateUserSuccess = () => {
  return {
    type: actionsTypes.UPDATE_USER_SUCCESS,
  };
};

export const updateUserComplete = () => {
  return {
    type: actionsTypes.UPDATE_USER_COMPLETE,
  };
};


export const updateUser = (User) => {
  return (dispatch) => {
    dispatch(uploadfileStart()); 
    const authData = {
      User: User,
      id:localStorage.getItem("userId")
    };
    let url = "http://localhost:8080/updateUser";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .put(url, authData, {
        headers: headers,
      })
      .then((response) => {
        console.log('updateUser succcess ' ,response)
        dispatch(updateUserSuccess());
      }).then((response) => {
        dispatch(updateUserComplete());
      }) 
      .catch((err) => {
        dispatch(uploadfileFail(err))
      });
  };
};



export const loadUserSuccess = (user) => {
  return {
    type: actionsTypes.LOADUSERDETAILS,
    user: user,
  };
};

export const loadUser = () => {
  console.log("IN loadUser")
  return (dispatch) => {
    axios
    .get(
      "http://localhost:8080/getUserDetails?userId=" +
        localStorage.getItem("userId")
    )
    .then((response) => {
      dispatch(loadUserSuccess(response.data[0]))
    })
    .catch((error) => {
      console.log("error",error)
      //dispatch(fetchIngredientsFailed());
    });
  };
};

export const updatePasswordSuccess = () => {
  return {
    type: actionsTypes.UPDATE_PASSWORD_SUCCESS,
  };
};

export const updatePasswordComplete = () => {
  return {
    type: actionsTypes.UPDATE_PASSWORD_COMPLETE,
  };
};

export const updatePassword = (newPassword) => {
  return (dispatch) => {
    const authData = {
      password: newPassword,
      id:localStorage.getItem("userId")
    };
    let url = "http://localhost:8080/updatePassword";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .put(url, authData, {
        headers: headers,
      })
      .then((response) => {
        console.log('updateUser succcess ' ,response)
        dispatch(updatePasswordSuccess());
      })  .then((response) => {
        dispatch(updatePasswordComplete())
      })
      .catch((err) => {
        //dispatch(uploadfileFail(err))
      });
  };
};




export const updateMainMenuSuccess = (menuname,menuid) => {
  return {
    type: actionsTypes.UPDATE_MAINMENU_SUCCESS,
    menuname:menuname,
    menuid:menuid
  };
};


export const mainMenuUpdate = (menuname,menuid) => {

  return (dispatch) => {
    const authData = {
      menuname: menuname,
      menuid:menuid
    };
    let url = "http://localhost:8080/updateMainMenu";
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .put(url, authData, {headers: headers,})
      .then((response) => {
        console.log('mainMenuUpdate succcess ' ,response)
        dispatch(updateMainMenuSuccess(menuname,menuid));
      })  .then((response) => {
        //dispatch(updatePasswordComplete())
      })
      .catch((err) => {
        //dispatch(uploadfileFail(err))
      });
  };
};


export const updateSubMenuSuccess = (submenuname,menuid) => {
  return {
    type: actionsTypes.UPDATE_SUBMENU_SUCCESS,
    submenuname:submenuname,
    menuid:menuid
  };
};


export const subMenuUpdate = (submenuname,menuid) => {

  return (dispatch) => {
    const authData = {
      submenuname: submenuname,
      menuid:menuid
    };
    let url = "http://localhost:8080/updateSubMenu";
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .put(url, authData, {headers: headers,})
      .then((response) => {
        console.log('subMenuUpdate succcess ' ,response)
        dispatch(updateSubMenuSuccess(submenuname,menuid));
      })  .then((response) => {
        //dispatch(updatePasswordComplete())
      })
      .catch((err) => {
        //dispatch(uploadfileFail(err))
      });
  };
};

export const deleteMainMenuSuccess = (menuid) => {
  return {
    type: actionsTypes.DELETE_MAINMENU_SUCCESS,
    menuid:menuid
  };
};

export const mainMenuDelete = (menuname,menuid) => {

  return (dispatch) => { 
    const authData = {
      menuname: menuname,
      menuid:menuid
    };
    let url = "http://localhost:8080/deleteMainMenu";
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .delete(url, {params: {menuid:menuid}}, {headers: headers,})
      .then((response) => {
        console.log('deleteMainMenu succcess ' ,response)
        dispatch(deleteMainMenuSuccess(menuid));
      })  .then((response) => {
        //dispatch(updatePasswordComplete())
      })
      .catch((err) => {
        //dispatch(uploadfileFail(err))
      });
  };
};



export const deleteSubMenuSuccess = (menuid) => {
  return {
    type: actionsTypes.DELETE_SUBMENU_SUCCESS,
    menuid:menuid
  };
};

export const subMenuDelete = (submenuname,menuid) => {

  return (dispatch) => { 
    let url = "http://localhost:8080/deleteSubMenu";
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .delete(url, {params: {menuid:menuid}}, {headers: headers,})
      .then((response) => {
        console.log('deleteMainMenu succcess ' ,response)
        dispatch(deleteSubMenuSuccess(menuid));
      })  .then((response) => {
        //dispatch(updatePasswordComplete())
      })
      .catch((err) => {
        //dispatch(uploadfileFail(err))
      });
  };
};