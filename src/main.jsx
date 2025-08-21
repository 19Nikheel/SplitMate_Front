import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { AlertProvider } from "./contexts/AlertContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ContextProvider>
        <AlertProvider>
          <UserProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </UserProvider>
        </AlertProvider>
      </ContextProvider>
    </HashRouter>
  </StrictMode>
);
