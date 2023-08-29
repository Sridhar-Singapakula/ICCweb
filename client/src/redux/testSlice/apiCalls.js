import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/tests";

export const createTest = async (payload, dispatch) => {
  dispatch(actions.createTestStart());
  try {
    const { data } = await axiosInstance.post(apiUrl, payload);
    dispatch(actions.createTestSuccess(data.data));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.createTestFailure());
    return false;
  }
};

export const editTest = async (id, payload, dispatch) => {
  dispatch(actions.editTestStart());
  try {
    const { data } = await axiosInstance.put(apiUrl + "/edit/" + id, payload);
    dispatch(actions.editTestSuccess(data.data));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.editTestFailure());
    return false;
  }
};

export const getTests = async (dispatch) => {
  dispatch(actions.getTestsStart());
  try {
    const { data } = await axiosInstance.get(apiUrl);
    dispatch(actions.getTestsSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getTestsFailure());
    return false;
  }
};

export const getTest = async (id, dispatch) => {
  dispatch(actions.getTestStart());
  try {
    const { data } = await axiosInstance.get(apiUrl + "/" + id);
    dispatch(actions.getTestSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getTestFailure());
    return false;
  }
};

export const deleteTest = async (id, dispatch) => {
  dispatch(actions.deleteTestStart());
  try {
    const { data } = await axiosInstance.delete(apiUrl + "/" + id);
    dispatch(actions.deleteTestSuccess(id));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.deleteTestFailure());
    return false;
  }
};
