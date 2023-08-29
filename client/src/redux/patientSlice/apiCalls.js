import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import * as actions from "./index";

const apiUrl = process.env.REACT_APP_API_URL + "/client/patients";


export const createPatient = async (payload, dispatch) => {
  dispatch(actions.createPatientStart());
  try {
    console.log(payload)
    const { data } = await axiosInstance.post(apiUrl, payload);
    
    dispatch(actions.createPatientSuccess(data.data));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.createPatientFailure());
    toast.error("Not have enough balance");
    return false;
  }
};

export const editPatient = async (id, payload, dispatch) => {
  dispatch(actions.editPatientStart());
  try {
    const { data } = await axiosInstance.put(apiUrl + "/edit/" + id, payload);
    dispatch(actions.editPatientSuccess(data.data));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.editPatientFailure());
    return false;
  }
};



export const getPatients = async (dispatch) => {
  dispatch(actions.getPatientsStart());
  try {
    const { data } = await axiosInstance.get(apiUrl + "/patients");
    dispatch(actions.getPatientsSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getPatientsFailure());
    return false;
  }
};

export const getPatient = async (id, dispatch) => {
  dispatch(actions.getPatientStart());
  try {
    const { data } = await axiosInstance.get(apiUrl + "/" + id);
    dispatch(actions.getPatientSuccess(data.data));
    return true;
  } catch (error) {
    dispatch(actions.getPatientFailure());
    return false;
  }
};

export const deletePatient = async (id, dispatch) => {
  dispatch(actions.deletePatientStart());
  try {
    const { data } = await axiosInstance.delete(apiUrl + "/" + id);
    dispatch(actions.deletePatientSuccess(id));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.deletePatientFailure());
    return false;
  }
};

export const addOnsToPatient = async (id, payload, dispatch) => {
  dispatch(actions.addTestsStart());
  try {
    const { data } = await axiosInstance.put(apiUrl + "/add-ons/" + id, payload);
    dispatch(actions.addTestsSuccess(data.data));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.addTestsFailure());
    return false;
  }
};

export const updateTestStatus = async (id, payload, dispatch) => {
  dispatch(actions.updateTestStatusStart());
  try {
    const { data } = await axiosInstance.put(apiUrl + "/updateTestStatus/" + id, payload);
    dispatch(actions.updateTestStatusSuccess({ patientId: id, updatedPatient: data.data }));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.updateTestStatusFailure());
    return false;
  }
};

export const updatePackageStatus = async (id, payload, dispatch) => {
  dispatch(actions.updatePackageStatusStart());
  try {
    const { data } = await axiosInstance.put(apiUrl + "/updatePackageStatus/" + id, payload);
    dispatch(actions.updatePackageStatusSuccess({ patientId: id, updatedPatient: data.data }));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.updatePackageStatusFailure());
    return false;
  }
};

export const updateTestStatusOfDirect = async (id, payload, dispatch) => {
  dispatch(actions.updateTestStatusStart());
  try {
    const { data } = await axiosInstance.put(process.env.REACT_APP_API_URL  + "/directPatient/updateTestStatus/" + id, payload);
    dispatch(actions.updateTestStatusSuccess({ patientId: id, updatedPatient: data.data }));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.updateTestStatusFailure());
    return false;
  }
};

export const updatePackageStatusOfDirect = async (id, payload, dispatch) => {
  dispatch(actions.updatePackageStatusStart());
  try {
    const { data } = await axiosInstance.put(process.env.REACT_APP_API_URL + + "/directPatient/updatePackageStatus/" + id, payload);
    dispatch(actions.updatePackageStatusSuccess({ patientId: id, updatedPatient: data.data }));
    toast.success(data.message);
    return true;
  } catch (error) {
    dispatch(actions.updatePackageStatusFailure());
    return false;
  }
};
