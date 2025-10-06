// src/utils/formValidators.js

export const validateContactForm = (formData) => {
  let errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }


  if (!formData.code.trim()) {
    errors.code = "Address is required";
  }
    if (!formData.description.trim()) {
    errors.description = "Address is required";
  }
  
   
  return errors;
};
