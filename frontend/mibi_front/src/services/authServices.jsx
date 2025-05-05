const API_MICROSERVICE = import.meta.env.VITE_API_MICROSERVICE_URL;

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
