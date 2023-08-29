import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/packages";

export const createPackage = async (payload, dispatch) => {
  dispatch(actions.createPackageStart());
  try {
    const { data } = await axiosInstance.post(apiUrl, payload);
    dispatch(actions.createPackageSuccess(data.data));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.createPackageFailure());
    return false;
  }
};

export const editPackage = async (id, payload, dispatch) => {
  dispatch(actions.editPackageStart());
  try {
    const { data } = await axiosInstance.put(apiUrl + "/" + id, payload);
    dispatch(actions.editPackageSuccess(data.data));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.editPackageFailure());
    return false;
  }
};

export const getPackages = async (dispatch) => {
  dispatch(actions.getPackagesStart());
  try {
    const { data } = await axiosInstance.get(apiUrl);
    dispatch(actions.getPackagesSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getPackagesFailure());
    return false;
  }
};

export const getPackage = async (id, dispatch) => {
  dispatch(actions.getPackageStart());
  try {
    const { data } = await axiosInstance.get(apiUrl + "/" + id);
    dispatch(actions.getPackageSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getPackageFailure());
    return false;
  }
};

export const deletePackage = async (id, dispatch) => {
  dispatch(actions.deletePackageStart());
  try {
    const { data } = await axiosInstance.delete(apiUrl + "/" + id);
    dispatch(actions.deletePackageSuccess(id));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.deletePackageFailure());
    return false;
  }
};
