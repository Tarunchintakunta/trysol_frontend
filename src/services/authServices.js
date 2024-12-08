import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "https://3.94.171.108:8080/trysol/auth/login",
      {
        email: email,
        password: password,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
