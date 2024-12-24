import axios from "axios";
import { appConfig } from "../common/config";

const saveAuthUser = (authUser) =>
  localStorage.setItem(appConfig.CURRENT_USER_KEY, JSON.stringify(authUser));

const getAuthUser = (authUser) =>
  JSON.parse(localStorage.getItem(appConfig.CURRENT_USER_KEY));


export const isUserLoggedIn=() =>{
  if(getAuthUser()){
    return true;
  }
  return false;
}

export const signup = ({ fname, lname, email, password, userType }) =>
  axios.post(`${appConfig.BASE_URL}/api/users/register`, {
    fname,
    lname,
    email,
    password,
    userType,
  });

export const login = async ({ type, email, password }) => {
  const res = (
    await axios.post(`${appConfig.BASE_URL}/api/users/login`, {
      type,
      email,
      password,
    })
  ).data;

  saveAuthUser(res)
};

export const logout=() => {
  localStorage.removeItem(appConfig.CURRENT_USER_KEY);
  //window.location.reload();
}
