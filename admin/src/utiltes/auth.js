import jwtDecode from "jwt-decode"; // lowercase 'D' in Decode

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
