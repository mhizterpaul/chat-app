import { Container, Box } from "@mui/material/";
import * as React from "react";
import Logo from "../components/ui/logo";
const Welcome = function () {
  const outline = `outline-1 outline-gray-300 rounded-full min-w-96`;
  return (
    <>
      <Container className=" overflow-hidden ">
        <div className={outline + "w-[calc(100vw+6rem)]"}>
          <div className={outline + "w-[calc(100vw+10rem)]"}>
            <div
              className={
                outline + "w-[calc(100vw+14rem)] flex flex-col gap-y-4"
              }
            >
              <Box className={"rounded-lg"}>
                <Logo className={" p-8 "} />
              </Box>
              <span className=" inline-block ">Chat</span>
              <span className=" inline-block ">Freedcamp</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Welcome;
