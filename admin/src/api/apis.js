export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  productMaster: {
    create: `${BASE_URL}//api/product-master`,
    get: `${BASE_URL}/api/v1/admin/category`,
    update: `${BASE_URL}/api/v1/admin/category/update-category`,
    delete: `${BASE_URL}/api/v1/admin/category/delete-category`,
  },
  user: {
    get: `${BASE_URL}/api/users`,
    register: `${BASE_URL}/api/v1/admin/user/register`,
  },
  auth: {
    login: `${BASE_URL}/api/login`,
    loggedIn: `${BASE_URL}/api/v1/admin/auth/loggedIn`,
  },
};

export default apis;
