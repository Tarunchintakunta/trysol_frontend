import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/trysol/auth/login", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
