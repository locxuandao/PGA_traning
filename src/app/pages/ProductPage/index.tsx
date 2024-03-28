import { Helmet } from "react-helmet-async";
import { ProductWrapper } from "app/container/ProductWrapper";

export const ProductPage = () => {
  return (
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <ProductWrapper />
    </>
  );
};
