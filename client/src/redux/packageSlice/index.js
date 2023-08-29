import { createSlice } from "@reduxjs/toolkit";

export const packageSlice = createSlice({
  name: "packages",
  initialState: {
    packages: [],
    createPackageProgress: false,
    editPackageProgress: false,
    getPackagesProgress: false,
    getPackageProgress: false,
    deletePackageProgress: false,
    error: false,
  },
  reducers: {
    createPackageStart: (state) => {
      state.createPackageProgress = true;
    },
    createPackageSuccess: (state, action) => {
      state.packages.push(action.payload);
      state.createPackageProgress = false;
    },
    createPackageFailure: (state) => {
      state.error = true;
      state.createPackageProgress = false;
    },
    editPackageStart: (state) => {
      state.editPackageProgress = true;
    },
    editPackageSuccess: (state, action) => {
      const index = state.packages.findIndex((pkg) => pkg._id === action.payload._id);
      state.packages[index] = action.payload;
      state.editPackageProgress = false;
    },
    editPackageFailure: (state) => {
      state.error = true;
      state.editPackageProgress = false;
    },
    getPackagesStart: (state) => {
      state.getPackagesProgress = true;
    },
    getPackagesSuccess: (state, action) => {
      state.packages = action.payload;
      state.getPackagesProgress = false;
    },
    getPackagesFailure: (state) => {
      state.error = true;
      state.getPackagesProgress = false;
    },
    getPackageStart: (state) => {
      state.getPackageProgress = true;
    },
    getPackageSuccess: (state, action) => {
      // Update the specific package in the state or handle it as needed
      state.packages = action.payload;
      state.getPackageProgress = false;
    },
    getPackageFailure: (state) => {
      state.error = true;
      state.getPackageProgress = false;
    },
    deletePackageStart: (state) => {
      state.deletePackageProgress = true;
    },
    deletePackageSuccess: (state, action) => {
      state.packages = state.packages.filter((pkg) => pkg._id !== action.payload);
      state.deletePackageProgress = false;
    },
    deletePackageFailure: (state) => {
      state.error = true;
      state.deletePackageProgress = false;
    },
  },
});

export const {
  createPackageStart,
  createPackageSuccess,
  createPackageFailure,
  editPackageStart,
  editPackageSuccess,
  editPackageFailure,
  getPackagesStart,
  getPackagesSuccess,
  getPackagesFailure,
  getPackageStart,
  getPackageSuccess,
  getPackageFailure,
  deletePackageStart,
  deletePackageSuccess,
  deletePackageFailure,
} = packageSlice.actions;

export default packageSlice.reducer;
