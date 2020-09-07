import axios from "axios";

const instance = axios.create({
  baseURL: "https://burgerbuilder-748cb.firebaseio.com/",
});

export default instance;
