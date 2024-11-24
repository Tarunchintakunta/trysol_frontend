import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://13.53.126.195:8080/trysol/auth/login",
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
