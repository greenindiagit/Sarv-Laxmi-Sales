// src/utils/formValidators.js

export const validateContactForm = (formData) => {
  let errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.landingNo.trim()) {
    errors.landingNo = "Landing No. is required";
  } else if (!/^0\d+$/.test(formData.landingNo)) {
    errors.landingNo = "Landing No. must start with 0";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.mobile.trim()) {
    errors.mobile = "Contact No. is required";
  } else if (!/^\d{10}$/.test(formData.mobile)) {
    errors.mobile = "Contact No. must be 10 digits";
  }

  if (!formData.location.trim()) {
    errors.location = "Location is required";
  }

  return errors;
};
