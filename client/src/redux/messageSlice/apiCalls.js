import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/messages";

export const sendMessage = async (clientId, payload, dispatch) => {
  try {
    const { data } = await axiosInstance.post(`${apiUrl}/${clientId}`, payload);
    dispatch(actions.sendMessageSuccess(data));
    toast.success("Message sent successfully");
    return true;
  } catch (error) {
    dispatch(actions.sendMessageFailure());
    return false;
  }
};

export const deleteMessage = async (clientId, messageId, dispatch) => {
  try {
    await axiosInstance.delete(`${apiUrl}/${clientId}/messages/${messageId}`);
    dispatch(actions.deleteMessageSuccess(messageId));
    toast.success("Message deleted successfully");
    return true;
  } catch (error) {
    dispatch(actions.deleteMessageFailure());
    return false;
  }
};
