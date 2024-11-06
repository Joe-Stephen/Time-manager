import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./utils/store";
import Body from "./components/Body";
import Head from "./components/Head";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      // { path: "/", element: <Punching /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <Head />
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
