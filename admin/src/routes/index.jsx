import Main from "../components/layouts/Main";
import { AddStaff } from "../components/staffs/AddStaff";
import Staffs from "../components/staffs/Staffs";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";

const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Dashboard /> }, // mặc định load Dashboard
      { path: "/staffs", element: <Staffs /> },
      { path: "/staffs/add-staff", element: <AddStaff /> },
      //   { path: "orders", element: <Orders /> },
      //   { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default routes;
