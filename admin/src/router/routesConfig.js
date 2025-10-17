import DashboardPage from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/Auth/LoginPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import UnauthorizedPage from "../pages/Unauthorized/UnauthorizedPage";
import UserListPage from "../pages/master/userList";
const routesConfig = {
  private: [
    { path: "/", element: DashboardPage },

    { path: "/users", element: UserListPage },
  ],
  public: [
    { path: "/login", element: LoginPage },
    { path: "/unauthorized", element: UnauthorizedPage },
    { path: "*", element: NotFoundPage },
  ],
};

export default routesConfig;
