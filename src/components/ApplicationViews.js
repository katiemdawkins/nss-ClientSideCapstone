import React from "react"
import { Route } from "react-router-dom"
import { MiniProfiles } from "./Connect/Connect"
import { CreateEvent } from "./Events/CreateEvent"
import { DisplayEvents } from "./Events/Events"
import { HomePage } from "./home/Home"
import { ProfileForm } from "./Profile/ProfileForm"
import { UserProfile } from "./Profile/UsersProfile"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <HomePage />
            </Route>
             <Route exact path="/myProfile">
                <UserProfile />
            </Route>
            <Route path="/connect">
                <MiniProfiles />
            </Route>
            <Route exact path="/myProfile/create">
                <ProfileForm />
            </Route>
            <Route exact path="/eventsCourses">
                <DisplayEvents />
            </Route>
            <Route exact path="/eventsCourses/create">
                <CreateEvent />
            </Route>
        </>
    )
}