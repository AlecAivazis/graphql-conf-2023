import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./views/Root.tsx";
import "./styles.css";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  suspense: true,
});

const HomeLazy = React.lazy(() => import("./views/Home.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLazy />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider value={client}>
      <Root>
        <RouterProvider router={router} />
      </Root>
    </Provider>
  </React.StrictMode>
);
