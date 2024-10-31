import * as React from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validationSchema from "../../../../shared/schemas/signup";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { customStyle } from "../../utils/constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { signup } from "../../store/slices/user/actions";

export default function Signup(): React.ReactNode {
  const selector = (state: RootState) => state.account.loading;
  const loading = useAppSelector(selector);
  const dispatch = useAppDispatch();

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    dirty,
    isValid,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => {
      dispatch(signup(values));
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="signup"
      className="flex flex-col gap-y-6 place-items-center "
    >
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email"
        type="email"
        aria-label="email"
        name="email"
        variant="outlined"
        sx={customStyle}
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="password"
        role="textbox"
        type="password"
        aria-label="password"
        autoComplete="current-password"
        variant="outlined"
        sx={customStyle}
        name="password"
        value={values.password}
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password && errors.password}
      />
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="confirm password"
        type="password"
        aria-label="confirm password"
        role="textbox"
        sx={customStyle}
        name="confirmPassword"
        autoComplete="current-password"
        variant="outlined"
        value={values.confirmPassword}
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        helperText={touched.confirmPassword && errors.confirmPassword}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={(!isValid && dirty) || !dirty || loading === "pending"}
        aria-label="submit"
        className="text-white "
        size="large"
      >
        Signup
      </Button>
    </Box>
  );
}
