import { Route, Routes } from "react-router-dom";

import { LoginPage } from "app/pages/LoginPage";
import { HomePage } from "app/pages/HomePage";
import { RegisterPage } from "app/pages/RegisterPage";

const Pages = {
  LoginPage: LoginPage,
  HomePage: HomePage,
  RegisterPage: RegisterPage,
};

const RootLayout = () => {
  return (
    <Routes>
      <Route path="/login" element={<Pages.LoginPage />} />
      <Route path="/" element={<Pages.HomePage />} />
      <Route path="/register" element={<Pages.RegisterPage />} />
    </Routes>
  );
};

export default RootLayout;
