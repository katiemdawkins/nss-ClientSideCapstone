import React from "react"
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./InMyLane.css"



export const InMyLane = () => (
    <>
    <Route
      render={() => {
        if (localStorage.getItem("in_my_lane_coach")) {
          return (
            <>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>

)
