import * as React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import validationSchema from "../../../../shared/login.schema";
import { customStyle } from "../signup";

const Login: React.FC = function () {
  const { values, isValid, dirty, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: toFormikValidationSchema(validationSchema),
      onSubmit: (values) => console.log(values),
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
        disabled={(!isValid && dirty) || !dirty}
        type="submit"
        variant="contained"
        aria-labe="submit"
        size="large"
      >
        Submit
      </Button>
    </Box>
  );
};

export default Login;
