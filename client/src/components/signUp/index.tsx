import * as React from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import validationSchema from "../../../../shared/signup.schema";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Signup: React.FC<object> = function (): React.ReactNode {
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
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="signup"
    >
      <TextField
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email"
        type="email"
        aria-label="email"
        name="email"
        variant="outlined"
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
        disabled={(!isValid && dirty) || !dirty}
        aria-label="submit"
        className="text-white "
      >
        Signup
      </Button>
    </Box>
  );
};

export default Signup;
