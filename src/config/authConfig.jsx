import { PublicClientApplication } from "@azure/msal-browser";



const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: import.meta.env.VITE_AUTHORITY,
    redirectUri: "http://localhost:3000",
    postLogoutRedirectUri: "http://localhost:3000",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
