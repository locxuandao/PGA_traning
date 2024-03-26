import classNames from "classnames/bind";

import styles from "./RegisterWrapper.module.scss";
import logoImg from "assets/imgs/logo.jpg";
import { RegisterForm } from "app/components/RegisterForm";
import { useRegister } from "mutations/auth";

import { useCallback } from "react";

import { enqueueSnackbar } from "notistack";

const cx = classNames.bind(styles);

export const RegisterWrapper = () => {
  const { mutateAsync } = useRegister();

  const handleRegister = useCallback((data: any) => {
    (async () => {
      try {
        await mutateAsync({
          email: data.email,
          gender: data.gender,
          name: data.name,
          password: data.password,
          region: data.region?.id,
          repeatPassword: data.repeatPassword,
          state: data.state?.id,
        });

        enqueueSnackbar("Đăng kí thành công !", { variant: "success" });
      } catch (error) {
        enqueueSnackbar("Đăng kí thất bại", {
          variant: "warning",
        });
      }
    })();
  }, []);
  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <img src={logoImg} alt="logo" className={cx("logoImg")} />
      </div>
      <RegisterForm onRegisterFrame={handleRegister} />
    </div>
  );
};
