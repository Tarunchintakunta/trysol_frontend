import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/trysol/auth/login`,
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
