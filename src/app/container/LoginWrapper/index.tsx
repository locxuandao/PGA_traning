import classNames from "classnames/bind";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { LoginForm } from "app/components/LoginForm";
import logoImg from "assets/imgs/logo.jpg";
import styles from "./LoginWrapper.module.scss";
import { setTokens } from "utils/storage";
import { useLogin } from "mutations/auth";
import { ILoginFormModel } from "types/Authentication";

const cx = classNames.bind(styles);

export const LoginWrapper = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useLogin();

  const handleNavigateHome = useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  const handleLogin = useCallback((data: ILoginFormModel) => {
    (async () => {
      try {
        const token = await mutateAsync({
          email: data.email,
          password: data.password,
        });
        if (token?.success == false) {
          enqueueSnackbar("sai tên đang nhập hoặc mật khẩu", {
            variant: "error",
          });
        } else {
          setTokens(token?.user);
          handleNavigateHome();
        }
      } catch (error) {
        enqueueSnackbar("lỗi chương trình", {
          variant: "error",
        });
      }
    })();
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <img src={logoImg} alt="logo" className={cx("logoImg")} />
      </div>
      <LoginForm onLoginFrame={handleLogin} />
    </div>
  );
};
