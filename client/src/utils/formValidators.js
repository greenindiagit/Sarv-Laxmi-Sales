// src/utils/formValidators.js

export const validateContactForm = (formData) => {
  let errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
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

  if (!formData.address.trim()) {
    errors.address = "Address is required";
  }
   if (!formData.contactMessage.trim()) {
    errors.contactMessage = "Message is required";
  }
  
   
  return errors;
};
