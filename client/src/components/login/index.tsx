import * as React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toFormikValidationSchema } from "zod-formik-adapter";
import validationSchema from "../../../../shared/login.schema";
//use redux to manage state

const Login: React.FC = function () {
  const model = useSelector((data) => data.user);
  const controller = useController();
  const { values, isValid, dirty } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values) => controller.login(values),
  });
  return (
    <Box component="form" aria-label="Login" noValidate onSubmit={handleSubmit}>
      <TextField
        placeholder="Email"
        type="email"
        name="email"
        variant="outlined"
        aria-label="email"
        value={values.email}
      />
      <TextField
        placeholder="Password"
        value={values.password}
        name="password"
        type="password"
        aria-label="password"
        variant="outlined"
      />
      <Button
        disabled={(!isValid && dirty) || !dirty}
        type="submit"
        aria-labe="submit"
      >
        Submit
      </Button>
    </Box>
  );
};

export default Login;
