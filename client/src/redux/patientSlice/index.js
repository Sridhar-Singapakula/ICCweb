import { createSlice } from "@reduxjs/toolkit";



export const patientSlice = createSlice({
    name: "patients",
    initialState: {
      patients: [],
      createPatientProgress: false,
      editPatientProgress: false,
      getPatientsProgress: false,
      getPatientProgress: false,
      deletePatientProgress: false,
      addTestsProgress: false,
      addPackageProgress: false,
      updateTestStatusProgress:false,
      updatePackageStatusProgress:false,
      updateTestStatusOfDirectProgress:false,
      updatePackageStatusOfDirectProgress:false,
      error: false,
    },
    reducers: {
      createPatientStart: (state) => {
        state.createPatientProgress = true;
      },
      createPatientSuccess: (state, action) => {
        state.patients.push(action.payload);
        state.createPatientProgress = false;
      },
      createPatientFailure: (state) => {
        state.error = true;
        state.createPatientProgress = false;
      },
  
      editPatientStart: (state) => {
        state.editPatientProgress = true;
      },
      editPatientSuccess: (state, action) => {
        const index = state.patients.findIndex(
          (patient) => patient._id === action.payload._id
        );
        state.patients[index] = action.payload;
        state.editPatientProgress = false;
      },
      editPatientFailure: (state) => {
        state.error = true;
        state.editPatientProgress = false;
      },
  
      getPatientsStart: (state) => {
        state.getPatientsProgress = true;
      },
      getPatientsSuccess: (state, action) => {
        state.patients = action.payload;
        state.getPatientsProgress = false;
      },
      getPatientsFailure: (state) => {
        state.error = true;
        state.getPatientsProgress = false;
      },
  
      getPatientStart: (state) => {
        state.getPatientProgress = true;
      },
      getPatientSuccess: (state, action) => {
        // Update the specific patient in the state or handle it as needed
        state.patients = action.payload;
        state.getPatientProgress = false;
      },
      getPatientFailure: (state) => {
        state.error = true;
        state.getPatientProgress = false;
      },
  
      deletePatientStart: (state) => {
        state.deletePatientProgress = true;
      },
      deletePatientSuccess: (state, action) => {
        state.patients = state.patients.filter(
          (patient) => patient._id !== action.payload
        );
        state.deletePatientProgress = false;
      },
      deletePatientFailure: (state) => {
        state.error = true;
        state.deletePatientProgress = false;
      },
  
      addTestsStart: (state) => {
        state.addTestsProgress = true;
      },
      addTestsSuccess: (state, action) => {
        const index = state.patients.indexOf(action.payload._id);
		    state.patients[index] = action.payload;
        state.addTestsProgress = false;
      },
      addTestsFailure: (state) => {
        state.error = true;
        state.addTestsProgress = false;
      },
  
      addPackageStart: (state) => {
        state.addPackageProgress = true;
      },
      addPackageSuccess: (state, action) => {
        const index = state.patients.indexOf(action.payload._id);
		state.patients[index] = action.payload;
        state.addPackageProgress = false;
      },
      addPackageFailure: (state) => {
        state.error = true;
        state.addPackageProgress = false;
      },
      
      updateTestStatusStart: (state) => {
        state.updateTestStatusProgress = true;
      },
      updateTestStatusSuccess: (state, action) => {
        const { patientId, updatedPatient } = action.payload;
        const index = state.patients.findIndex((patient) => patient._id === patientId);
        state.patients[index] = updatedPatient;
        state.updateTestStatusProgress = false;
      },
      updateTestStatusFailure: (state) => {
        state.error = true;
        state.updateTestStatusProgress = false;
      },
      updatePackageStatusStart: (state) => {
        state.updatePackageStatusProgress = true;
      },
      updatePackageStatusSuccess: (state, action) => {
        const { patientId, updatedPatient } = action.payload;
        const index = state.patients.findIndex((patient) => patient._id === patientId);
        state.patients[index] = updatedPatient;
        state.updatePackageStatusProgress = false;
      },
      updatePackageStatusFailure: (state) => {
        state.error = true;
        state.updatePackageStatusProgress = false;
      },
      updateTestStatusOfDirectStart: (state) => {
        state.updateTestStatusProgress = true;
      },
      updateTestStatusOfDirectSuccess: (state, action) => {
        const { patientId, updatedPatient } = action.payload;
        const index = state.patients.findIndex((patient) => patient._id === patientId);
        state.patients[index] = updatedPatient;
        state.updateTestStatusProgress = false;
      },
      updateTestStatusOfDirectFailure: (state) => {
        state.error = true;
        state.updateTestStatusProgress = false;
      },
      updatePackageStatusOfDirectStart: (state) => {
        state.updatePackageStatusProgress = true;
      },
      updatePackageStatusOfDirectSuccess: (state, action) => {
        const { patientId, updatedPatient } = action.payload;
        const index = state.patients.findIndex((patient) => patient._id === patientId);
        state.patients[index] = updatedPatient;
        state.updatePackageStatusProgress = false;
      },
      updatePackageStatusOfDirectFailure: (state) => {
        state.error = true;
        state.updatePackageStatusProgress = false;
      },
    },
  });
  
  export const {
    createPatientStart,
    createPatientSuccess,
    createPatientFailure,
    editPatientStart,
    editPatientSuccess,
    editPatientFailure,
    getPatientsStart,
    getPatientsSuccess,
    getPatientsFailure,
    getPatientStart,
    getPatientSuccess,
    getPatientFailure,
    deletePatientStart,
    deletePatientSuccess,
    deletePatientFailure,
    addTestsStart,
    addTestsSuccess,
    addTestsFailure,
    addPackageStart,
    addPackageSuccess,
    addPackageFailure,
    updateTestStatusStart,
    updateTestStatusSuccess,
    updateTestStatusFailure,
    updatePackageStatusStart,
    updatePackageStatusSuccess,
    updatePackageStatusFailure,
    updateTestOfDirectStatusStart,
    updateTestOfDirectStatusSuccess,
    updateTestOfDirectStatusFailure,
    updatePackageOfDirectStatusStart,
    updatePackageOfDirectStatusSuccess,
    updatePackageOfDirectStatusFailure,
    
  } = patientSlice.actions;
  
  export default patientSlice.reducer;