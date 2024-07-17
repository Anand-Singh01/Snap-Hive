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
      message: "Password: 5-20 characters.",
    },
    maxLength: {
      value: 20,
      message: "Password: 5-20 character.",
    },
  },
  username: {
    required: "Username is required.",
    minLength: {
      value: 2,
      message: "Username: 2-20 characters.",
    },
    maxLength: {
      value: 20,
      message: "name: 2-20 characters.",
    },
  },
  name: {
    required: "name is required.",
    minLength: {
      value: 2,
      message: "name: 2-20 characters.",
    },
    maxLength: {
      value: 20,
      message: "name: 2-20 characters.",
    },
  },

  caption: {
    maxLength: {
      value: 500,
      message: "caption: max 50 character.",
    },
  },

  location: {
    maxLength: {
      value: 20,
      message: "location: max 20 character.",
    },
  },

  tags: {
    maxLength: {
      value: 50,
      message: "tags: max 50 character.",
    },
  },

  image:{
  
  }
};
