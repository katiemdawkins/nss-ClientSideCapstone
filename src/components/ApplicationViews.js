import React from "react"
import { Route } from "react-router-dom"
import { MyFavorites } from "../favorites.js/MyFavorites"
import { MiniProfiles } from "./Connect/Connect"
import { CreateEvent } from "./Events/CreateEvent"
import { EditEvent } from "./Events/EditEvent"
import { DisplayEvents } from "./Events/Events"
import { ViewEvent } from "./Events/ViewEvent"
import { HomePage } from "./home/Home"
import { EditProfileForm } from "./Profile/EditProfileForm"
import { MyProfile } from "./Profile/MyProfile"
import { ProfileForm } from "./Profile/ProfileFormCreate"
import { ViewProfile } from "./Profile/ViewProfile"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/myProfile/:userId(\d+)">
                <MyProfile />
            </Route>
            <Route exact path="/myProfile/create/:userId(\d+)">
                <ProfileForm />
            </Route>
            <Route exact path="/myProfile/edit/:userId(\d+)">
                <EditProfileForm />
            </Route>
            <Route exact path="/connect">
                <MiniProfiles />
            </Route>
            <Route exact path="/connect/:userId(\d+)">
                <ViewProfile />
            </Route>
            <Route exact path="/myFavorites">
                <MyFavorites />
            </Route>
            <Route exact path="/eventsCourses">
                <DisplayEvents />
            </Route>
            <Route exact path="/eventsCourses/create">
                <CreateEvent />
            </Route>
            <Route exact path="/eventsCourses/edit/:eventId(\d+)">
                <EditEvent />
            </Route>
            <Route exact path="/eventsCourses/viewEvent/:eventId(\d+)">
                <ViewEvent />
            </Route>
        </>
    )
}
