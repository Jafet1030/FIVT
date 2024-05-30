import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";


ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={{ primaryColor: 'blue' }}>
  <React.StrictMode>
    <Auth0Provider domain="dev-ttr758n76p4qar3s.us.auth0.com"
     clientId="Mr4qahwKs3OpqStbkDNxbkSxLIul2LVD"
     authorizationParams={{
      redirect_uri: "http://localhost:3000"
     }}
     audience="http://localhost:8000"
     scope="openid profile email">
      <App />
    </Auth0Provider>
  </React.StrictMode>
  </MantineProvider>
);
