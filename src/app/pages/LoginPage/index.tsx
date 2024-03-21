import { Helmet } from "react-helmet-async";
import { LoginWrapper } from "app/container/LoginWrapper";

export const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginWrapper />
    </>
  );
};
