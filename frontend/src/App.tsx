import React from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./utils/store";
import Body from "./components/Body";
import Head from "./components/Head";
import MainLayout from "./components/Layout/MainLayout";

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
      <MainLayout>
        <RouterProvider router={appRouter} />
      </MainLayout>
    </Provider>
  );
}

export default App;
