import React, { useState, useEffect} from "react"
import { getAllUserProfiles, getAllUsers } from "../ApiManager"
import "./UsersProfile.css"

export const UserProfile = () => {
    const [ userProfiles, setUserProfiles] = useState([])
    const [ allUsers, setAllUsers ] = useState([])
    //const [ currentUser, setCurrentUser ] = useState({})

    const userProfileState = () => {
        getAllUserProfiles()
        .then (
            (userProfiles) => {
                setUserProfiles(userProfiles)
            }
        )
    }
    const allUsersState =() => {
        getAllUsers()
        .then(
            (users)=>{
                setAllUsers(users)
            }
        )
    }

    useEffect(
        () => {
            userProfileState()
        },
        []
    )

    useEffect(
        ()=>{
            allUsersState()
        },
        []
    )

    // useEffect(
    //     () =>{
    //         const profiles = userProfileState()
    //         const users = allUsersState()

    //         const foundCurrentUser = 
    //     }
    // )


    return(
        <>
         {
            userProfiles.map(
                (userProfile) => {
                    if(userProfile.userId === parseInt(localStorage.getItem("in_my_lane_coach"))){
                    return <div className="profileInfo" key={`user--${userProfile.id}`}>
                            <h2>{userProfile.fullName}</h2>
                            <h3>{userProfile.coachType.name}</h3>
                            <p>Specialties: {userProfile.specialties}</p>
                            <p>My Website: {userProfile.website}</p>
                            <p>Email: {userProfile.email}</p>
                            <p>Taking NewClients: {userProfile.takingClients? "Yes": "No"}</p>
                            <p>Works with clients: {userProfile.serviceLocation.name}</p>
                            <p>{userProfile.location}</p>
                            <p>About {userProfile.fullName}: {userProfile.bio}</p>
                            <p>Events + Courses: {userProfile.event.name}</p>
                    </div>
                    }
                }
            )
        }

        </>
    )
}

        // {
        //     allUsers.map(
        //         (user)=>{
        //             if (user.id === parseInt(localStorage.getItem("in_my_lane_coach"))){
        //                 return <div>
        //                     </div>
        //             }
        //         }
        //     )
        // }