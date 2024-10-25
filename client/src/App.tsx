import * as React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import SignOn from "./pages/signOn";
import Welcome from "./pages/welcome";
//const Chat = lazy(() => import("./pages/chat"));
//const Profile = lazy(() => import("./pages/settings"));
const PageNotFound = React.lazy(() => import("./pages/404"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/404" element={<PageNotFound />}></Route>
        <Route path="/sign-on" element={<SignOn />}></Route>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="*" element={<Navigate to={"/404"} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
