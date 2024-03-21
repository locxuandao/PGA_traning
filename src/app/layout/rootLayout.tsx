import { Route, Routes } from "react-router-dom";

import { LoginPage } from "app/pages/LoginPage";
import { HomePage } from "app/pages/HomePage";

const Pages = {
  LoginPage: LoginPage,
  HomePage: HomePage,
};

const RootLayout = () => {
  return (
    <Routes>
      <Route path="/login" element={<Pages.LoginPage />} />
      <Route path="/" element={<Pages.HomePage />} />
    </Routes>
  );
};

export default RootLayout;
