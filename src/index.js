import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./redux/contactSlice";
import App from "./components/App";

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
