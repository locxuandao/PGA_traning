import { Helmet } from "react-helmet-async";
import { HomePageWrapper } from "app/container/HomePageWrapper";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <HomePageWrapper />
    </>
  );
};
