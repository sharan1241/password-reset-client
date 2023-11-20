import {
  Route,
  Routes
} from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import {
  useEffect
} from "react";
import success from "./success";
import Email from "./Email";
import Verify from "./Verify";
import Home from "./Home";


function App() {
  const token = localStorage.getItem("refreshToken")



  return ( <
      div className = "App" >
      <
      Routes > {
        !token && < Route path = "/"
        Component = {
          Home
        }
        />} {
          !token && < Route path = "/forgotpassword"
          Component = {
            ForgotPassword
          }
          />} {
            token && < Route path = "/resetpassword"
            Component = {
              ResetPassword
            }
            />} {
              token && < Route path = "/success"
              Component = {
                success
              }
              />} {
                token && < Route path = "/email"
                Component = {
                  Email
                }
                />} {
                  token && < Route path = "/verify/:key"
                  Component = {
                    Verify
                  }
                  />} <
                  /Routes> <
                  /div>
                );
              }

              export default App;