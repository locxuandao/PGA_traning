import classNames from "classnames/bind";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ILoginFormModel } from "types/Authentication";

import styles from "./LoginForm.module.scss";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";

const cx = classNames.bind(styles);

const newLoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Vui lòng nhập email"),
  password: Yup.string().trim().required("Vui lòng nhập mật khẩu"),
});

interface Props {
  onLoginFrame?: (data: ILoginFormModel) => void;
}

export const LoginForm = (props: Props) => {
  const { onLoginFrame = () => {} } = props;
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const handleTogglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ILoginFormModel>({
    resolver: yupResolver(newLoginSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const handleChangeData = useCallback(
    (data: ILoginFormModel) => {
      onLoginFrame({ ...data });
    },
    [reset],
  );

  const handleNavigateRegister = useCallback(() => {
    navigate(`/register`);
  }, [navigate]);

  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <Typography className={cx("title")} component="p">
          Đăng nhập
        </Typography>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(handleChangeData)}
        className={cx("form")}
      >
        <FormControl className={cx("formItem")}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                helperText={errors.email ? errors.email?.message : ""}
                error={!!errors.email}
                fullWidth
                margin="dense"
              />
            )}
          />
        </FormControl>

        <FormControl className={cx("formItem")}>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                className={cx("input")}
                {...field}
                label="Mật khẩu"
                variant="outlined"
                type={passwordShown ? "text" : "password"}
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
          {errors?.password ? (
            <div></div>
          ) : (
            <RemoveRedEye
              onClick={handleTogglePasswordVisiblity}
              className={cx("eyeIcon")}
            />
          )}
        </FormControl>

        <FormControl className={cx("formItem")}>
          <Button
            className={cx("btnSubmitForm")}
            onClick={handleSubmit(handleChangeData)}
            disabled={errors?.email || errors?.password ? true : false}
          >
            Đăng nhập
          </Button>
        </FormControl>

        <FormControl className={cx("formItem")}>
          <Button
            className={cx("btnNavigateRegister")}
            onClick={handleNavigateRegister}
          >
            Đăng kí
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
