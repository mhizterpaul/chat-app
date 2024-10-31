import { IoKeyOutline } from "react-icons/io5";
import { PiSquaresFourLight } from "react-icons/pi";
import * as React from "react";
import { theme } from "../../theme";
import EditIcon from "../../components/ui/editIcon";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Container,
  Button,
  CardMedia,
  MenuItem,
  Select,
  OutlinedInput,
  Menu,
} from "@mui/material";
import action from "../../store/slices/user/actions";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import validationSchema from "./schema";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { MenuProps } from "../../utils/constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { User } from "../../store/slices/user/types";

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = (state: RootState) => state.account;
  const account = useAppSelector(selector);
  dispatch(action.setActivePage({ name: "profile" }));
  //Route Guard
  if (!account.user) navigate("sign-on");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const {
    values,
    isValid,
    handleChange,
    handleBlur,
    touched,
    errors,
    dirty,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      homepage: "Homepage",
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (values, { resetForm }) => {
      const _user = account.user as User;
      const Values = Object(values);
      const name = Values.name.split(",");
      delete Values["name"];
      dispatch(
        action.updateProfile({
          firstName: name[0],
          lastName: name[1],
          ..._user,
          ...Values,
        })
      );
      if (account.loading === "succeeded") resetForm({ values });
    },
  });

  return (
    <>
      <Container className=" flex flex-col px-8 place-items-center justify-between w-full gap-y-6 mt-6 ">
        <Box
          sx={{ maxHeight: 250, height: "33vh", width: "100%", maxWidth: 576 }}
          className=" flex gap-x-4  place-items-center "
        >
          <CardMedia
            component="img"
            sx={{
              maxWidth: 150,
              width: "33%",
            }}
            className=" rounded-full "
            src={account.user?.image}
            alt={`${account.user?.firstName} ${account.user?.lastName}`}
          />
          <Button
            sx={{
              width: "60%",
              textAlign: "center",
              fontWeight: "semibold",
              maxWidth: 300,
            }}
            variant="contained"
            size="large"
            onClick={handleClick}
          >
            <EditIcon /> edit Avatar
          </Button>
          <Menu
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            className=" [&_ul>*:active]:font-bold [&_ul>*:hover]:font-bold mt-2 ml-[6.25%]"
          >
            <MenuItem onClick={handleClose}>Delete Avatar</MenuItem>
            <MenuItem onClick={handleClose}>Upload from Gallery</MenuItem>
            <MenuItem onClick={handleClose}>Take a photo</MenuItem>
          </Menu>
        </Box>
        <Box
          component="form"
          noValidate
          className=" flex flex-col pl-4 [&>div:not(:first-child)]:w-full [&>div:not(:first-child)]:max-w-96 gap-y-6 items-start content-center justify-between w-full max-w-xl"
          onSubmit={handleSubmit}
        >
          <Box className=" [&>*]:inline-block text-nowrap ">
            <div
              style={{ backgroundColor: theme.palette.primary.main }}
              className={`  w-10 h-12 mr-4  `}
            ></div>
            <Typography className=" align-top mt-2 mr-10 " variant="h6">
              Personal Information
            </Typography>
          </Box>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HiOutlineEnvelope />
                  </InputAdornment>
                ),
              },
            }}
            onBlur={handleBlur}
            onChange={handleChange}
            required
            placeholder="Email"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            aria-label="email"
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      className="w-[1.25rem] h-[1.25rem] "
                    >
                      <path
                        fill="currentColor"
                        d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18m2 0h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T12 15t-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2zm6-8q.825 0 1.413-.587T14 8t-.587-1.412T12 6t-1.412.588T10 8t.588 1.413T12 10m0 8"
                      />
                    </svg>
                  </InputAdornment>
                ),
              },
            }}
            required
            placeholder="firstName lastName"
            label="Name"
            type="name"
            name="name"
            variant="outlined"
            aria-label="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IoKeyOutline />
                  </InputAdornment>
                ),
              },
            }}
            required
            placeholder="Password"
            value={values.password}
            name="password"
            type="password"
            label="Password"
            onChange={handleChange}
            aria-label="password"
            variant="outlined"
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Select
            displayEmpty
            value={values.homepage}
            onChange={handleChange}
            onBlur={handleBlur}
            label={values.homepage}
            input={<OutlinedInput />}
            name="homepage"
            renderValue={(selected) => {
              if (selected == "Homepage") {
                return (
                  <Box className=" [&>*]:inline-block text-nowrap">
                    <PiSquaresFourLight className="align-middle" />
                    <Typography className="align-top ">Homepage</Typography>
                  </Box>
                );
              }

              return selected;
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="Homepage">
              <PiSquaresFourLight /> <Typography>Homepage</Typography>
            </MenuItem>
            {["chat list", "status"].map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Button
            disabled={
              (!isValid && dirty) || !dirty || account.loading === "pending"
            }
            type="submit"
            aria-label="submit"
            size="large"
            className=" self-center mr-[15%] sm:mr-[30%] "
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Container>
    </>
  );
}
