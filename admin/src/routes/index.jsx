import Main from "../components/layouts/Main";
import AddShift from "../components/shifts/AddShift";
import EditShift from "../components/shifts/EditShift";
import Shifts from "../components/shifts/Shifts";
import { AddStaff } from "../components/staffs/AddStaff";
import EditStaff from "../components/staffs/EditStaff";
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

      // Staffs
      { path: "/staffs", element: <Staffs /> },
      { path: "/staffs/add-staff", element: <AddStaff /> },
      { path: "/staffs/edit-staff/:id", element: <EditStaff /> },

      // Shifts

      { path: "/shifts", element: <Shifts /> },
      { path: "/shifts/add-shift", element: <AddShift /> },
      { path: "/shifts/edit-shift/:id", element: <EditShift /> },

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
