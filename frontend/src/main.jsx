/*
  This is the main frontend jsx file which loads the react app
*/

//specify imports
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import App from "./App.jsx";

const queryClient = new QueryClient();

//Render the page onto index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        {/* <ReactQueryDevtools /> */}
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);