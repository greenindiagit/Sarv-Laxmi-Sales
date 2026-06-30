const API_PATHS = {
  productMaster:"/api/product-master",
  Projects: "/api/products", // for POST
  ProjectEdit: "/api/products", // for PUT, append /id
  ProjectDelete: "/api/products",
  ProductTypes: "/api/product-type",
  ProductTypesEdit: "/api/product-type",
  ProductTypesDelete: "/api/product-type",
  login: "/api/login",
  logout: "/api/logout",
  users: "/api/users",
  updateUser: "/api/users",
  deleteUsers: "/api/users",
  
  passwordReset: "/api/users/request-reset", // 🔹 fixed
  resetPassword: "/api/users/reset-password", // 🔹 added
   Banners: "/api/banners",
};

export default API_PATHS;
