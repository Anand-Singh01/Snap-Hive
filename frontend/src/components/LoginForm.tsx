import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { validationRules } from "../utils/validation";
import Button from "./Button";
import InputField from "./InputField";

const LoginForm = () => {
  const methods = useForm();

  const onSubmit = (data) => {};
  const [signIn_click, setSignIn_Click] = useState(false);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="login-form">
        <div className="input-container">
          <InputField
            type="email"
            name="email"
            label="Email"
            placeholder="abc@mail.com"
            validation={validationRules.email}
          />
        </div>
        <div className="input-container">
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            validation={validationRules.password}
          />
        </div>
        <div className="btn-div">
          <Button
            onClick={() => setSignIn_Click(true)}
            type="submit"
            className="btn"
          >
            Sign in
          </Button>
          <p>OR</p>
          <Button
            onClick={() => setSignIn_Click(true)}
            type="submit"
            className="btn-guest"
          >
            Explore as Guest
          </Button>

          <p className="signup-text">
            Don’t have an account yet? <Link to={"/signUp"}>SignUp</Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
