import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import values from "../../values";
import { callApi } from "./Configs/ApiConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export async function login({ email, password }) {
  const data = await callApi({
    url: `${values.serverURL}/login?email=${email}&password=${password}`,
    method: values.methods.GET,
  });
  return data;
}

export function useLogout() {
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken("");
    setUser("");
    navigate("/login");
  };

  return logout;
}
