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
