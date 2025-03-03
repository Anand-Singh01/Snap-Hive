import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { signUpUser } from "../utils/api-communicator";
import { ISignUpData } from "../utils/interfaces";
import { validationRules } from "../utils/validation";
import Button from "./Button";
import InputField from "./InputField";
import Loader from "./Loader";

const SignUpForm = () => {
  const methods = useForm<ISignUpData>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ISignUpData) => {
    const result = await dispatch(signUpUser(data));
    if (signUpUser.pending.match(result)) {
      setIsLoading(true);
    }
    if (signUpUser.fulfilled.match(result)) {
      setIsLoading(false);
      navigate("/");
    }
    if (signUpUser.rejected.match(result)) {
      setIsLoading(false);
      if (result.payload?.error && result.payload.status) {
        const { error, status } = result.payload;
        if (status === 409 && error != null && typeof error === "object") {
          alert(error.msg);
        }
      } else {
        alert("an error occurred please try again.");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="login-form">
        <div className="input-container">
          <InputField
            type="text"
            name="username"
            label="Username"
            placeholder="name"
            validation={validationRules.username}
          />
        </div>
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
          <Button type="submit" className="btn">
            {isLoading ? <Loader /> : "Sign Up"}
          </Button>

          <p className="signup-text">
            Already have an account? <Link to={"/login"}>SignIn</Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignUpForm;
