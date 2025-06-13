import * as React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import validationSchema from "../../schemas/login";
import { customStyle } from "../../utils/constants";
import { login } from "../../store/slices/user/actions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store";

const Login: React.FC = function () {
  const dispatch = useAppDispatch();
  const selector = (state: RootState) => state.account.loading;
  const loading = useAppSelector(selector);

  const { values, isValid, dirty, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: toFormikValidationSchema(validationSchema),
      onSubmit: (values) => dispatch(login(values)),
    });
  return (
    <Box
      component="form"
      aria-label="Login"
      noValidate
      onChange={handleChange}
      onBlur={handleBlur}
      className="flex flex-col gap-y-6 place-items-center"
      onSubmit={handleSubmit}
    >
      <TextField
        placeholder="Email"
        type="email"
        name="email"
        sx={customStyle}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        aria-label="email"
        value={values.email}
      />
      <TextField
        placeholder="Password"
        value={values.password}
        name="password"
        sx={customStyle}
        type="password"
        aria-label="password"
        variant="outlined"
      />
      <Button
        disabled={(!isValid && dirty) || !dirty || loading === "pending"}
        type="submit"
        variant="contained"
        aria-label="submit"
        size="large"
      >
        Submit
      </Button>
    </Box>
  );
};

export default Login;
