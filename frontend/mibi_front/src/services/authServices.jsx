const API_MICROSERVICE = import.meta.env.VITE_API_MICROSERVICE_URL;

// API CALL LOGIN FROM /API
export const LoginUser = async ({ email, password }) => {
  const resLogin = await fetch(`${API_MICROSERVICE}/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  console.log("res:", resLogin);
  return resLogin;
};

// API CALL REGISTER FROM /API
export const RegisterUser = async ({ name, email, password }) => {
  const resRegister = await fetch(`${API_MICROSERVICE}/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
  console.log("res:", resRegister);
  return resRegister;
};

// TOKEN HELPER
export const getToken = () => localStorage.getItem("access_token");

export const setToken = (token) => localStorage.setItem("access_token", token);

export const clearToken = () => localStorage.removeItem("access_token");
