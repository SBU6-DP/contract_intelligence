import { createBrowserRouter, NavLink, useRouteError } from "react-router-dom";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import Login from "./Components/Pages/Login/Login";
import Layouts from "./Components/Pages/Layouts/Layouts";
import PrivateRoutes from "./Components/hoc/PrivateRoutes";
import concat from "lodash/concat";
import Employee from "./Components/Pages/Employee/Employee";
import Profile from "./Components/Pages/Profile/Profile";
import AppWrapper from "./AppWrapper";
import Patients from "./Components/Pages/Patients/Patients";
import Criteria from "./Components/Pages/Criteria/Criteria";
import Hcp from "./Components/Pages/HCP/Hcp";
import NewHcp from "./Components/Pages/HCP/NewHcp";
import Upload from "./Components/Pages/Upload/Upload";
import Preview from "./Components/Preview/Preview";
import ContractFile from "./Components/Pages/ContractFile/ContractFile";
import Chat from "./Components/Pages/Chat/Chat";
import ContractList from "./Components/Pages/ContractList/ContractList";

const dashboardRoutes = [
  {
    handle: {
      crumb: () => (
        <NavLink to="/dashboard" className="breadcrumb-link">
          Dashboard
        </NavLink>
      ),
      activeMenuId: "dashboard",
    },
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
];

const profileRoutes = [
  {
    handle: {
      crumb: () => (
        <NavLink to="/profile" className="breadcrumb-link">
          Profile
        </NavLink>
      ),
      activeMenuId: "profile",
    },
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];

const patientsRoutes = [
  {
    handle: {
      crumb: () => (
        <NavLink to="/patients" className="breadcrumb-link">
          Patients
        </NavLink>
      ),
      activeMenuId: "patients",
    },
    children: [
      {
        path: "/patients",
        element: <Patients />,
      },
    ],
  },
];

const criteriaRoutes = [
  {
    handle: {
      crumb: () => (
        <NavLink to="/criteria" className="breadcrumb-link">
          Criteria
        </NavLink>
      ),
      activeMenuId: "criteria",
    },
    children: [
      {
        path: "/criteria",
        element: <Criteria />,
      },
    ],
  },
];

const hcpRouters = [
  {
    handle: {
      crumb: () => (
        <NavLink to="/hcp" className="breadcrumb-link">
          HCP
        </NavLink>
      ),
      activeMenuId: "hcp",
    },
    children: [
      {
        path: "/hcp",
        element: <NewHcp />,
      },
    ],
  },
];

const uploadRouters = [
  {
    path: "/list",
    handle: {
      crumb: () => (
        <NavLink to="/list" className="breadcrumb-link">
          Upload
        </NavLink>
      ),
      activeMenuId: "list",
    },
    children: [
      {
        index: true,
        element: <ContractList />,
      },
      {
        path: "/list/upload",
        element: <Upload />,
      },
      {
        path: "/list/preview",
        element: <Preview />,
      },
    ],
  },
];

const chatRouters = [
 { 
  path: "/chat",
  handle: {
      crumb: () => (
        <NavLink to="/chat" className="breadcrumb-link">
          Chat
        </NavLink>
      ),
      activeMenuId: "chat",
    },
  children: [
      {
        index: true,
        element: <Chat />,
      },
    ],
  },
  
]

export const router = createBrowserRouter(
  [
    // Public Routes
    {
      path: "/",
      element: (
        <>
          <AppWrapper /> {/* ✅ Now inside Router context */}
          <Login />
        </>
      ),
    },
    //   { path: '/forgotpassword', element: <ForgotPassword /> },
    //   { path: '/request/otp', element: <ForgotPasswordCode /> },
    //   { path: '/request/password', element: <NewPassword /> },
    //   { path: '/request/password/success', element: <Success /> },
    //   { path: '/request/auth/:loginUUID', element: <RequestLogin /> },

    // Private Routes
    {
      element: <PrivateRoutes />,
      children: [
        {
          element: "",
          children: concat(
            uploadRouters,
            chatRouters
          ),
          errorElement: <ErrorBoundary />,
        },
      ],
    },
  ],
  { basename: "/" }
);

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div></div>;
}

export default router;
