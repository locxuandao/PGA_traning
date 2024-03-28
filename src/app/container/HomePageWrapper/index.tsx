import classNames from "classnames/bind";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import styles from "./HomePageWrapper.module.scss";

const cx = classNames.bind(styles);

export const HomePageWrapper = () => {
  const navigate = useNavigate();

  const handleNavigateEx4 = useCallback(() => {
    navigate(`/product`);
  }, [navigate]);
  return (
    <div className={cx("container")}>
      <Button className={cx("btnNavigate")}>Exercies 3</Button>
      <Button className={cx("btnNavigate")} onClick={handleNavigateEx4}>
        Exercies 4
      </Button>
      <Button className={cx("btnNavigate")}>Exercies 5</Button>
    </div>
  );
};
