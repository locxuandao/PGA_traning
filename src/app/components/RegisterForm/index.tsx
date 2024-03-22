import classNames from "classnames/bind";
import {
  Typography,
  FormControl,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";

import styles from "./RegisterForm.module.scss";
import { IRegisterModel } from "types/Authentication";
import { Region } from "types/Region";

import { useGetAllRegion } from "queries/region";
import { useGetStateByPid } from "queries/state";

const cx = classNames.bind(styles);

const newRegisterSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required field"),
  password: Yup.string().trim().required("Password is required field"),
  repeatPassword: Yup.string()
    .trim()
    .required("RepeatPassword is required field")
    .oneOf([Yup.ref("password")], "Password must match"),
  name: Yup.string().required("Name is required field"),
  gender: Yup.string().required("Gender is required field"),
  region: Yup.object().required("Region is required field"),
  state: Yup.object().required("State is required field"),
});

interface Props {
  onRegisterFrame?: (data: IRegisterModel) => void;
}

export const RegisterForm = (props: Props) => {
  const { onRegisterFrame = () => {} } = props;
  const [pidState, setPidState] = useState<Region | null>();

  const { data: regions = [], isLoading: isLoadingRegion } = useGetAllRegion();

  const { data: states = [] } = useGetStateByPid(Number(pidState?.id));

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IRegisterModel>({
    resolver: yupResolver(newRegisterSchema),
    defaultValues: {
      email: undefined,
      gender: undefined,
      name: undefined,
      password: undefined,
      region: undefined,
      repeatPassword: undefined,
      state: undefined,
    },
  });

  const handleChangeData = useCallback(
    (data: IRegisterModel) => {
      onRegisterFrame({
        ...data,
      });
    },
    [reset],
  );

  return (
    <div className={cx("container")}>
      <div className={cx("heading")}>
        <Typography className={cx("title")} component="p">
          Đăng Kí
        </Typography>
      </div>
      <form action="" className={cx("form")}>
        <FormControl className={cx("formItem")}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
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
                {...field}
                label="Password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
        </FormControl>

        <FormControl className={cx("formItem")}>
          <Controller
            name="repeatPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="repeatPassword"
                variant="outlined"
                error={!!errors.repeatPassword}
                helperText={
                  errors.repeatPassword ? errors.repeatPassword?.message : ""
                }
                fullWidth
                margin="dense"
              />
            )}
          />
        </FormControl>

        <FormControl className={cx("formItem")}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name ? errors.name?.message : ""}
                fullWidth
                margin="dense"
              />
            )}
          />
        </FormControl>

        <FormControl className={cx("formItem")}>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                aria-placeholder="gender"
                onChange={(event, item) => {
                  onChange(item);
                }}
                options={["male", "female"]}
                value={value || null}
                sx={{ width: 300 }}
                disablePortal
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Gender"
                    error={!!errors.gender}
                    helperText={errors.gender ? errors.gender?.message : ""}
                  />
                )}
              />
            )}
          />
        </FormControl>

        <FormControl className={cx("formItem")}>
          <Controller
            control={control}
            name="region"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                aria-placeholder="Region"
                onChange={(event, item) => {
                  onChange(item);
                  setPidState(item);
                }}
                loading={isLoadingRegion}
                options={regions}
                getOptionLabel={option => option.name}
                value={value || null}
                isOptionEqualToValue={(option, values) =>
                  option.id === values.id
                }
                sx={{ width: 300 }}
                disablePortal
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Region"
                    error={!!errors.region}
                    helperText={errors.region ? errors.region?.message : ""}
                  />
                )}
              />
            )}
          />
        </FormControl>

        <FormControl className={cx("formItem")}>
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                aria-placeholder="State"
                onChange={(event, item) => {
                  onChange(item);
                }}
                options={states}
                getOptionLabel={option => option.name}
                value={value || null}
                sx={{ width: 300 }}
                disablePortal
                renderInput={params => (
                  <TextField
                    {...params}
                    label="State"
                    error={!!errors.state}
                    helperText={errors.state ? errors.state?.message : ""}
                  />
                )}
              />
            )}
          />
        </FormControl>
        <FormControl className={cx("formItem")}>
          <Button
            className={cx("btnSubmitForm")}
            onClick={handleSubmit(handleChangeData)}
          >
            Đăng kí
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
