import { Container, Typography, Box } from "@mui/material/";
import Logo from "../components/ui/logoIcon";
import theme from "../theme";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { getUserInfo } from "../store/slices/user/actions";
export default function Welcome() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  dispatch(getUserInfo());
  const outline = ` flex flex-col place-items-center justify-center border-gray-400 border-opacity-75  rounded-full min-w-96 `;
  //Redirect
  React.useEffect(() => {
    setTimeout(() => navigate("/sign-on"), 4500);
  }, [navigate]);

  return (
    <>
      <Container
        className=" flex flex-col place-items-center overflow-hidden h-screen"
        sx={{ backgroundColor: "secondary.main" }}
      >
        <div
          className={
            outline +
            " my-auto border-[1px] h-[calc(100vh-1rem)] w-[calc(100vh-1rem)] ripple "
          }
        >
          <div
            className={outline + " border-2 h-[calc(83.5vh)] w-[calc(83.5vh)] "}
          >
            <div
              className={
                outline +
                " border-[3px] h-[calc(72.5vh)] w-[calc(72.5vh)] unripple "
              }
            >
              <Box className="relative flex">
                <Logo
                  style={{
                    color: theme.palette.primary.main,
                    backgroundColor: "white",
                    width: "8rem",
                    height: "8rem",
                    padding: "2rem",
                    borderRadius: "2rem",
                    marginBottom: "1rem",
                  }}
                />
                <span className="absolute inline-flex top-[2.325rem] right-[2.325rem] h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
              </Box>
              <Typography
                variant="h3"
                className="text-white inline-block mb-1 font-bold"
              >
                Chat
              </Typography>
              <Typography
                variant="body2"
                className=" text-white inline-block opacity-75"
              >
                Freecamp
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
