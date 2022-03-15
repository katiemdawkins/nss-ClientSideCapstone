import React from "react"
import { Route } from "react-router-dom"
import { MiniProfiles } from "./Connect/Connect"
import { CreateEvent } from "./Events/CreateEvent"
import { EditEvent } from "./Events/EditEvent"
import { DisplayEvents } from "./Events/Events"
import { HomePage } from "./home/Home"
import { MyProfile } from "./Profile/MyProfile"
import { ProfileForm } from "./Profile/ProfileFormCreate"



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
            <Route path="/connect">
                <MiniProfiles />
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
        </>
    )
}

            // <Route exact path="/myProfile/create/:userId(\d+)">
            //     <ProfileForm />
            // </Route>
{/* <Route exact path="/myProfile/:userId(\d+)">
<UsersProfile />
</Route> */}