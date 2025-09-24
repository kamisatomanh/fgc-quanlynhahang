import Main from "../components/layouts/Main";
import Dashboard from "../pages/Dashboard/Dashboard";

const routes = [
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Dashboard /> }, // mặc định load Dashboard
    //   { path: "users", element: <Users /> },
    //   { path: "orders", element: <Orders /> },
    //   { path: "settings", element: <Settings /> },
    ],
  },
];

export default routes;
