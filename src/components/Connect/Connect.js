import React, { useState, useEffect} from "react"
import { getAllUserProfiles, getCoachLocations} from "../ApiManager"
import { Link } from "react-router-dom"
import "./connect.css"

export const MiniProfiles = () => {
    const [ userProfiles, setUserProfiles] = useState([])
    const [ coachLocations, setCoachLocations ] = useState([])


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

    useEffect (
        ()=>{
            return fetch ("http://localhost:8088/coachLocations?_expand=serviceLocation")
            .then(res => res.json())
            .then((data)=>{
                setCoachLocations(data)
            })
        },
        []
    )




    return(
        <>
         {
            userProfiles.map(
                (userProfile) => {
                    return <div className="profileInfo" key={`user--${userProfile.id}`}>
                            <h2><Link to={`/connect/${userProfile.userId}`}>{userProfile.firstName} {userProfile.lastName}</Link></h2>
                            <h3>{userProfile.coachType.name}</h3>
                            <p>Taking New Clients: {userProfile.takingClients? "Yes": "No"}</p>
                            <p>{userProfile.location}</p>
                            <p className="bolder">Services Clients: </p>
                            {
                                coachLocations.map(
                                    (coachLocation)=>{
                                    if (coachLocation.userId === userProfile.userId){
                                        return <p>{coachLocation.serviceLocation.name}</p>
                                        }
                                    }
                                )
                            }
                    </div>
                    }
                    )
                }

        </>
    )
}
