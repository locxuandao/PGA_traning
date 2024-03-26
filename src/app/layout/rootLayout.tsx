import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { RegisterPage } from "app/pages/RegisterPage";

const Pages = {
  RegisterPage: RegisterPage,
  Guards: Guards,
};

const RootLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Guards />} />
      <Route path="/register" element={<Pages.RegisterPage />} />
    </Routes>
  );
};

export default RootLayout;
