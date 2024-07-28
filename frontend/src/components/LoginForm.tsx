import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { loginUser } from "../utils/api-communicators/user";
import { ILoginData } from "../utils/constants/interfaces";
import { validationRules } from "../utils/constants/validation";
import Button from "./Button";
import InputField from "./InputField";
import Loader from "./Loader";

const LoginForm = () => {
  const methods = useForm<ILoginData>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ILoginData) => {
    setIsLoading(true);
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      setIsLoading(false);
      navigate("/");
    }
    if (loginUser.rejected.match(result)) {
      setIsLoading(false);
      if (result.payload?.error && result.payload.status) {
        const { error, status } = result.payload;
        if (status === 401 && error != null && typeof error === "object") {
          alert(error.msg);
        }
      } else {
        alert("An error occurred, please try again.");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="login-form">
        <div className="input-container">
          <InputField
            labelClass="text-[12px] my-3"
            inputClass="inputDiv-login-signup"
            type="email"
            name="email"
            label="Email"
            placeholder="abc@mail.com"
            validation={validationRules.email}
          />
        </div>
        <div className="input-container">
          <InputField
            inputClass="inputDiv-login-signup"
            labelClass="text-[12px] my-3"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            validation={validationRules.password}
          />
        </div>
        <div className="btn-div">
          <Button type="submit" className="btn">
            {isLoading ? <Loader /> : "Sign in"}
          </Button>
          <p>OR</p>
          <Button type="button" className="btn-guest">
            Explore as Guest
          </Button>

          <p className="signup-text">
            Don’t have an account yet? <Link to={"/signUp"}>Sign Up</Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
