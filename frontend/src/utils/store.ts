import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./slices/logSlice";
import appReducer from "./slices/appSlice";

const appStore = configureStore({
  reducer: { log: logReducer, app: appReducer },
});
export default appStore;
