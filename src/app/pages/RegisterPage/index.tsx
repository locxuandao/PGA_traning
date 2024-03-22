import { Helmet } from "react-helmet-async";
import { RegisterWrapper } from "app/container/RegisterWrapper";

export const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <RegisterWrapper />
    </>
  );
};
