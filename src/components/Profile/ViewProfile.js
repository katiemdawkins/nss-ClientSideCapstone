//users will navigate to another users profile via the mini profile in the connect page
//this component will display a users full profile

import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { getAllEvents, getAllUserProfiles, getAllUsers } from "../ApiManager"
import { UserProfile } from "./UsersProfile"
import "./ViewProfile.css"

export const ViewProfile = () => {
    const [userProfile, setUserProfile] = useState({})
    const [ currentCoachLocations, setCurrentCoachLocations ] = useState([])
    const [ events, setEvents ] = useState([])

    const {userId} = useParams()
    const history = useHistory()

    useEffect (
        () =>{
            return fetch(`http://localhost:8088/userProfiles/${userId}?_expand=coachType`)
            .then (res => res.json())
            .then((data)=>{
                setUserProfile(data)
            })
        },
        [userId]
    )

    useEffect(
        () =>{
            return fetch (`http://localhost:8088/coachLocations?_expand=serviceLocation`)
            .then(res => res.json())
            .then ((data)=>{
                setCurrentCoachLocations(data)
            })
        },
        []
    )

    useEffect(
        ()=>{
            getAllEvents()
            .then((data)=>{
                setEvents(data)
            })
        },
        []
    )

    return (
        <>
            {
                <div className="profilePage" key={`user--${userProfile.id}`}>
                    <div className="topInfo">
                        <img src = {userProfile?.imageURL} alt= "Profile picture"/> 
                            <div className="mainDetails">
                                <h2 className="profileName">{userProfile.firstName} {userProfile.lastName}</h2>
                                <h3 className="profileType">{userProfile.coachType?.name}</h3>
                                <p>Bio: {userProfile.bio}</p>
                            </div>
                    </div>
                    <div className="smallerDetails">
                        <p>Specialties: {userProfile.specialties}</p>
                        <p>Website: {userProfile.website}</p>
                            <p>Email: {userProfile.email}</p>
                            <p>Taking NewClients: {userProfile.takingClients? "Yes": "No"}</p>
                            <p className="bolder">Service Location: </p>
                            {
                                currentCoachLocations.map(
                                    (currentCLocation)=>{
                                        if(currentCLocation.userId === userProfile.userId){
                                            return <>
                                            <p>{currentCLocation.serviceLocation.name}</p>
                                            </>
                                        }
                                    }
                                    )
                                }
                            <p>Location: {userProfile.location}</p>
                            {
                                events.map(
                                    (event)=>{
                                        if(event.userId === userProfile.userId){
                                            return <p>Events + Courses: {event.name}</p>
                                        }
                                    }
                                    )
                                }
                            
                    </div>
                    <div className="btnSection">
                        <button className = "btn" onClick={() => history.push(`/connect/message`)}>Message</button>
                        <button className = "btn" onClick={() => history.push(`/connect`)}>Connect with Others</button>
                    </div>
                     
                </div>
            }
        </>
    )
}
