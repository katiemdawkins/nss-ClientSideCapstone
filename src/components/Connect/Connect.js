import React, { useState, useEffect} from "react"
import { getAllUserProfiles} from "../ApiManager"
import "./connect.css"

export const MiniProfiles = () => {
    const [ userProfiles, setUserProfiles] = useState([])


    const userProfileState = () => {
        getAllUserProfiles()
        .then (
            (userProfiles) => {
                setUserProfiles(userProfiles)
            }
        )
    }

    useEffect(
        () => {
            userProfileState()
        },
        []
    )




    return(
        <>
         {
            userProfiles.map(
                (userProfile) => {
                    return <div className="profileInfo" key={`user--${userProfile.id}`}>
                            <h2>{userProfile.fullName}</h2>
                            <h3>{userProfile.coachType.name}</h3>
                            <p>Taking New Clients: {userProfile.takingClients? "Yes": "No"}</p>
                            <p>Works with clients: {userProfile.serviceLocation.name}</p>
                            <p>{userProfile.location}</p>
                    </div>
                    }
            )
        }

        </>
    )
}
