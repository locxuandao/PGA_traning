import { Route, Routes } from "react-router-dom";

import { Guards } from "app/pages/Guards";
import { RegisterPage } from "app/pages/RegisterPage";
import { ProductPage } from "app/pages/ProductPage";

const Pages = {
  RegisterPage: RegisterPage,
  Guards: Guards,
  ProductPage: ProductPage,
};

const RootLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Guards />} />
      <Route path="/register" element={<Pages.RegisterPage />} />
      <Route path="/product" element={<Pages.ProductPage />} />
    </Routes>
  );
};

export default RootLayout;
