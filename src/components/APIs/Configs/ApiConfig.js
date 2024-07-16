import { toast } from "react-toastify";
import values from "../../../values";

export async function callApi(url, method, body) {
  if (
    method === values.methods.GET ||
    method === values.methods.POST ||
    method === values.methods.DELETE
  ) {
    const response = await fetch(url, {
      method: method,
      body: body,
      headers: {
        authorization: "token",
      },
    });

    const data = await response.json();

    return data;
  } else {
    toast.error("Something went wrong! Please try again");
  }
}
