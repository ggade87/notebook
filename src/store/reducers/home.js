import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
  editableContent:{name:"",value:""},
  error: null,
  contentError: null,
  mainMenu: [
    { _id: 1, name: "REACT" },
    { _id: 2, name: "CSS" },
    { _id: 3, name: "JS" },
  ],
  subMenu: [],
  tempSubMenu: [
    { _id: 2, mid: "5f28004b7d40ad241c9fecff", subMenuName: "Routing" },
  ],
  subMenuContent: [],
  tempSubMenuContent: [
    {
      id: 1,
      smid: 1,
      name: "What is redux",
      value: "Redux is state managment tools",
    },
    {
      id: 2,
      smid: 1,
      name: "What is thunk",
      value: "Redux thunk is a middle ware",
    },
    {
      id: 3,
      smid: 2,
      name: "What is routing",
      value: "Routing is react library use for navigation",
    },
    {
      id: 4,
      smid: 3,
      name: "What is Pagging",
      value: "Create multiple pages ",
    },
    {
      id: 5,
      smid: 5,
      name: "What is js fucntion",
      value: "It a noral javascriot fucntion",
    },
  ],
  loading: false,
  file: [], 
  User:{
    },
    message:"",
    updatePasswordFlag:false,
};

const loadMainMenu = (state, action) => {
  const updatedState = {
    mainMenu: action.mainMenu,
  };
  return updateObject(state, updatedState);
};

const setMainMenu = (state, action) => {
  //insertedId
  const arr = {
    _id: action.mainMenu.ops[0]._id,
    name: action.mainMenu.ops[0].name,
  };
  const updateArr = [...state.mainMenu];
  updateArr.push(arr);
  const updatedState = {
    mainMenu: updateArr,
  };
  return updateObject(state, updatedState);
};

const loadSubMenu = (state, action) => {
  const filterArray = action.SubMenu;
  const updatedState = {
    subMenu: filterArray,
    error: null,
  };
  return updateObject(state, updatedState);
};

const setSubMenu = (state, action) => {
  const arr = {
    _id: action.subMenu.ops[0]._id,
    mid: action.subMenu.ops[0].mid,
    name: action.action.subMenu.ops[0].name,
  };
  const updateArr = [...state.subMenu];
  updateArr.push(arr);
  const updatedState = {
    subMenu: updateArr,
  };
  return updateObject(state, updatedState);
};

const loadSubMenuContent = (state, action) => {
  const filterArray = action.subMenuContent; //.filter((i) => i.smid === action.id);
  const updatedState = {
    subMenuContent: filterArray,
    contentError: null,
  };

  return updateObject(state, updatedState);
};
const fetchSubMenuFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

const setContent = (state, action) => {
  const subMenuContentAdded = [...action.subMenuContent.ops];
  const arr2 = {
    _id: subMenuContentAdded[0]._id,
    mid: subMenuContentAdded[0].smid,
    name:subMenuContentAdded[0].name,
    value: subMenuContentAdded[0].value,
  };
  const updateArr = [...state.subMenuContent];
  updateArr.push(arr2);
  const updatedState = {
    subMenuContent: updateArr,
  };
  return updateObject(state, updatedState);
};
const fetchContentFail = (state, action) => {
  return updateObject(state, {
    contentError: action.error,
  });
};

const uploadFile = (state, action) => {
  const newOrder = updateObject(action.file, { id: action.id });
  return updateObject(state, {
    file: state.file.concat(newOrder),
    loading: false,
  });
};

const uploadFileStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const uploadFileFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const loadFileSuccess = (state, action) => {
  return updateObject(state, {
    file: action.file,
    loading: false,
  });
};

const loadUserSuccess = (state, action) => {
  console.log("loadUserSuccess  ",action.user)
  return updateObject(state, {
    User: action.user,
    message:"",
    loading:false
  });
};
const updateUserSuccess = (state, action) => {
  return updateObject(state, {
    message: "User updated",
    loading:false
  });
};
const updateUserComplete = (state, action) => {
  return updateObject(state, {
    message: "",
  });
};

const updatePasswordSuccess = (state, action) => {
  return updateObject(state, {
    updatePasswordFlag: true,
  });
};

const updatePasswordComplete = (state, action) => {
  return updateObject(state, {
    updatePasswordFlag: false,
  });
};

const updateMainMenuSuccess = (state, action) => {
  const mainMenuUpdated = [...state.mainMenu];
  const index = state.mainMenu.findIndex((m) => m._id === action.menuid);
  mainMenuUpdated[index] = {...mainMenuUpdated[index], name: action.menuname}  
  const updatedState = {
    mainMenu: mainMenuUpdated,
  };
  return updateObject(state, updatedState);
};

const updateSubMenuSuccess = (state, action) => {
  const subMenuUpdated = [...state.subMenu];
  const index = state.mainMenu.findIndex((m) => m._id === action.menuid);
  subMenuUpdated[index] = {...subMenuUpdated[index], name: action.submenuname}  
  const updatedState = {
    subMenu: subMenuUpdated,
  };
  return updateObject(state, updatedState);
};
const deleteMainMenuSuccess = (state, action) => {
  const mainMenuUpdated = [...state.mainMenu];
  const index = state.mainMenu.findIndex((m) => m._id === action.menuid);
  mainMenuUpdated.splice(index, 1);
  const updatedState = {
    mainMenu: mainMenuUpdated,
  };
  return updateObject(state, updatedState);
};


const deleteSubMenuSuccess = (state, action) => {
  const subMenuUpdated = [...state.subMenu];
  const index = state.subMenu.findIndex((m) => m._id === action.menuid);
  subMenuUpdated.splice(index, 1);
  const updatedState = {
    subMenu: subMenuUpdated,
  };
  return updateObject(state, updatedState);
};

const deleteContentSuccess = (state, action) => {
  const subMenuContentUpdated = [...state.subMenuContent];
  const index = state.subMenuContent.findIndex((m) => m._id === action.id);
  subMenuContentUpdated.splice(index, 1);
  const updatedState = {
    subMenuContent: subMenuContentUpdated,
  };
  return updateObject(state, updatedState);
};


const loadEditableContentSuccess = (state, action) => {
  const updatedState = {
    editableContent: action.editableContent,
  };
  return updateObject(state, updatedState);
};
const clearEditableContentSuccess = (state, action) => {
  const updatedState = {
    editableContent: {name:"",value:""},
  };
  return updateObject(state, updatedState);
};

const updateContentSuccess = (state, action) => {
 // const updatedState = {
  //};
  //return updateObject(state, updatedState);
  const Content = [...state.subMenuContent];
  const index = state.subMenuContent.findIndex((m) => m._id === action.id);
  Content[index] = {...Content[index], value: action.value}  
  const updatedState = {
    subMenuContent: Content,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MENUES:
      return loadMainMenu(state, action);
    case actionTypes.SET_HOME_MAIN_MENU:
      return setMainMenu(state, action);
    case actionTypes.GET_SUBMENUES:
      return loadSubMenu(state, action);
    case actionTypes.GET_SUBMENUES_FAILED:
      return fetchSubMenuFail(state, action);
    case actionTypes.SET_SUBMENUES:
      return setSubMenu(state, action);
    case actionTypes.GET_SUBMENUES_CONTENT:
      return loadSubMenuContent(state, action);
    case actionTypes.ADD_CONTENT:
      return setContent(state, action);
    case actionTypes.GET_CONTENT_FAILED:
      return fetchContentFail(state, action);
    case actionTypes.UPLOADFILE:
      return uploadFile(state, action);
    case actionTypes.LOAD_FILE_SUCCESS:
      return loadFileSuccess(state, action);
    case actionTypes.UPLOADFILE_START:
      return uploadFileStart(state, action);
    case actionTypes.UPLOADFILE_FAIL:
      return uploadFileFail(state, action);
    case actionTypes.LOADUSERDETAILS:
      return loadUserSuccess(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_COMPLETE:
      return updateUserComplete(state, action);
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return updatePasswordSuccess(state, action);
    case actionTypes.UPDATE_PASSWORD_COMPLETE:
      return updatePasswordComplete(state, action);
    case actionTypes.UPDATE_MAINMENU_SUCCESS:
      return updateMainMenuSuccess(state, action);
    case actionTypes.UPDATE_SUBMENU_SUCCESS:
      return updateSubMenuSuccess(state, action);
    case actionTypes.DELETE_MAINMENU_SUCCESS:
      return deleteMainMenuSuccess(state, action);
    case actionTypes.DELETE_SUBMENU_SUCCESS:
      return deleteSubMenuSuccess(state, action);
    case actionTypes.DELETE_CONTENT_SUCCESS:
      return deleteContentSuccess(state, action);
    case actionTypes.LOAD_EDITABLE_CONTENT:
      return loadEditableContentSuccess(state, action);
    case actionTypes.CLEAR_EDITABLE_CONTENT:
      return clearEditableContentSuccess(state, action);
    case actionTypes.UPDATE_CONTENT_SUCCESS:
      return updateContentSuccess(state, action);
    default:
      return state;
  }
};
export default reducer;
