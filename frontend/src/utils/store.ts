import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./slices/logSlice";

const appStore = configureStore({
  reducer: { log: logReducer },
});
export default appStore;
