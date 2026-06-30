export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  product: {
    create: `${BASE_URL}/api/common/products/create-products`,
    get: `${BASE_URL}/api/common/products/products`,
    update: (id) => `${BASE_URL}/api/common/products/update-products/${id}`,
    delete: (id) => `${BASE_URL}/api/common/products/delete-products/${id}`,
  },
  productMaster: {
    create: `${BASE_URL}/api/common/products/product-master`,
    get: `${BASE_URL}/api/common/products/product-master`,
    update: `${BASE_URL}/api/common/products/product-master`,
    delete: `${BASE_URL}/api/common/products/product-master`,
  },
  productType: {
    create: `${BASE_URL}/api/admin/product-type`,
    get: `${BASE_URL}/api/common/products/product-type`,
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
    update: (id) => `${BASE_URL}/api/admin/users/change-password/${id}`,
  },
  Banners: {
    create: `${BASE_URL}/api/common/banners/banners`,
    get: `${BASE_URL}/api/common/banners/banners`,
    update: `${BASE_URL}/api/common/banners/banners`,
    delete: `${BASE_URL}/api/common/banners/banners`,
  },
  auth: {
    login: `${BASE_URL}/api/admin/auth/login`,
    loggedIn: `${BASE_URL}/api/admin/auth/loggedIn`,
  },
};

//  console.log(apis.product.update);
export default apis;
