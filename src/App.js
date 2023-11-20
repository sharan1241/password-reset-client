import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Application/ResetPassword";
import { useEffect } from "react";
import success from "./pages/Application/success";
import Email from "./pages/Application/Email";
import Verify from "./pages/Application/Verify";
import Home from "./pages/Application/Home";


function App() {
  const token = localStorage.getItem("refreshToken")
   

  
  return (
    <div className="App">
      <Routes>
        {!token && <Route path="/" Component={Home}/>}
        {!token && <Route path="/forgotpassword" Component={ForgotPassword}/>}
        {token && <Route path="/resetpassword" Component={ResetPassword}/>}
        {token && <Route path="/success" Component={success}/>}
        {token && <Route path="/email" Component={Email}/>}
        {token && <Route path="/verify/:key" Component={Verify}/>}
      </Routes>
    </div>
  );
}

export default App;
