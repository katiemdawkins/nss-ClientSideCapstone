import React from "react"
import { Route } from "react-router-dom"
import { HomePage } from "./home/Home"
import { UserProfile } from "./Profile/UsersProfile"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <HomePage />
            </Route>
             <Route path="/myProfile">
                <h1>My Profile</h1>
                <UserProfile />
            </Route>
            <Route path="/connect">
                <h1>Connect</h1>
            </Route>
            <Route path="/eventsCourses">
                <h1>Events + Courses</h1>
            </Route>
        </>
    )
}