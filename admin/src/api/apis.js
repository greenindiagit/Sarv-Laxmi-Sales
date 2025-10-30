export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  product: {
    create: `${BASE_URL}/api/admin/products/create-products`,
    get: `${BASE_URL}/api/admin/products`,
    update: `${BASE_URL}/api/admin/products/update-products`,
    delete: `${BASE_URL}/api/admin/products/delete-products`,
  },
  productMaster: {
    create: `${BASE_URL}/api/admin/product-master/create-products`,
    get: `${BASE_URL}/api/admin/product-master`,
    update: `${BASE_URL}/api/admin/product-master/update-products`,
    delete: `${BASE_URL}/api/admin/product-master/delete-products`,
  },
  productType: {
    create: `${BASE_URL}/api/admin/product-type`,
    get: `${BASE_URL}/api/admin/product-type`,
    update: `${BASE_URL}/api/admin/product-type`,
    delete: `${BASE_URL}/api/admin/product-type`,
  },
  user: {
    create: `${BASE_URL}/api/admin/users/register`,
    get: `${BASE_URL}/api/admin/users`,
    update: (id) => `${BASE_URL}/api/admin/users/${id}`,
    delete: (id) => `${BASE_URL}/api/admin/users/${id}`,
    register: `${BASE_URL}/api/admin/users/register`,
  },
  passwordChange: {
    passwordReset: `${BASE_URL}/api/admin/users/request-reset`,
    resetPassword: `${BASE_URL}/api/admin/users/reset-password`,
  },
  Banners: {
    get: `${BASE_URL}/api/admin/banners`,
  },
  auth: {
    login: `${BASE_URL}/api/admin/auth/login`,
    loggedIn: `${BASE_URL}/api/admin/auth/loggedIn`,
  },
};

export default apis;
