import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

import App from "./App";

import {
  AuthProvider,
} from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <App />

      </AuthProvider>

      <Toaster
        position="top-right"
        toastOptions={{

          duration: 3000,

          style: {

            borderRadius: "18px",

            padding: "14px 18px",

            background: "#ffffff",

            color: "#111827",

            border: "1px solid #e5e7eb",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          },

          success: {

            iconTheme: {

              primary: "#2563eb",

              secondary: "#ffffff",
            },
          },

          error: {

            iconTheme: {

              primary: "#ef4444",

              secondary: "#ffffff",
            },
          },
        }}
      />

    </BrowserRouter>

  </React.StrictMode>
);