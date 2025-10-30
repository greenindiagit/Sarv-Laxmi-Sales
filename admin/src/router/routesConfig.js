import DashboardPage from "../pages/dashboard/Dashboard";
import LoginPage from "../pages/Auth/LoginPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import UnauthorizedPage from "../pages/Unauthorized/UnauthorizedPage";
import UserListPage from "../pages/master/userList";
import ProjectList from "../pages/project/projectList";
import ProjectTypeList from "../pages/project/projectTypeList";
import ProjectMaster from "../pages/master/productMaster";
import banners from "../pages/master/banner";
const routesConfig = {
  private: [
   { path: "/dashboard", element: DashboardPage },
   { path: "/users", element: UserListPage },
   { path: "/Projects", element: ProjectList },
   { path: "/ProjectType", element: ProjectTypeList },
   { path: "/project-master", element: ProjectMaster },
   { path: "/banner", element: banners },
   
  ],
  public: [
    { path: "/login", element: LoginPage },
    { path: "/unauthorized", element: UnauthorizedPage },
    { path: "*", element: NotFoundPage },
  ],
};

export default routesConfig;
