import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
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
  const arr = {
    _id: action.subMenuContent.ops[0]._id,
    mid: action.subMenuContent.ops[0].smid,
    name: action.action.subMenuContent.ops[0].name,
    value: action.action.subMenuContent.ops[0].value,
  };
  const updateArr = [...state.subMenuContent];
  updateArr.push(arr);
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
    default:
      return state;
  }
};
export default reducer;
