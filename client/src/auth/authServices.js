import axios from "axios";
import { appConfig } from "../common/config";

export const signup = ({ fname, lname, email, password,userType }) =>
  axios.post(`${appConfig.BASE_URL}/api/users/register`, {
    fname,
    lname,
    email,
    password,
    userType
  });
