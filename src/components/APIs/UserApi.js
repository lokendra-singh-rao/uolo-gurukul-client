import values from "../../values";
import { callApi } from "./Configs/ApiConfig";

export async function getUsers({ currentPage, searchQuery }) {
  const data = await callApi(
    `${values.serverURL}/users?page=${currentPage}&query=${searchQuery}`,
    "GET"
  );
  return data;
}

export async function deleteUser({ id }) {
  const data = await callApi(`${values.serverURL}/users?id=${id}`, "DELETE");
  return data;
}

export async function addUser(formDataToSend) {
  console.log("adduser", formDataToSend);
  const data = await callApi(
    `${values.serverURL}/users`,
    "POST",
    formDataToSend
  );
  return data;
}
