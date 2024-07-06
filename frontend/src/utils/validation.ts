export const validationRules = {
  email: {
    required: "Email is required.",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required.",
    minLength: {
      value: 5,
      message: "Password must be 5-20 characters long.",
    },
    maxLength: {
      value: 20,
      message: "Password must be 5-20 characters long.",
    },
  },
  username: {
    required: "Username is required.",
    minLength: {
      value: 2,
      message: "Username must be 2-20 characters long.",
    },
    maxLength: {
      value: 20,
      message: "Username must be 2-20 characters long.",
    },
  },
};
