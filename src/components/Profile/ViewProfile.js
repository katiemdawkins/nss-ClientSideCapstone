//users will navigate to another users profile via the mini profile in the connect page
//this component will display a users full profile

import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { getAllEvents, getAllUserProfiles, getAllUsers } from "../ApiManager"
import { UserProfile } from "./UsersProfile"
import { Link } from "react-router-dom"
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
    
    const addFavorite = (evt) =>{
        evt.preventDefault()

        const favoriteProfileObj = {
            userId: parseInt(localStorage.getItem("in_my_lane_coach")),
            userProfileId: userProfile.id
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favoriteProfileObj)
        }
        return fetch("http://localhost:8088/userFavorites", fetchOption)
        .then(()=>{
            history.push("/myFavorites")
        })
    }

    return (
        <>

            {
                <div className="profilePage" key={`user--${userProfile.id}`}>
                    <div className="topInfo">
                        <img className="profileImg"src = {userProfile?.imageURL} alt= "Profile picture"/> 
                            <div className="mainDetails">
                                <h2 className="profileName">{userProfile.firstName} {userProfile.lastName}</h2>
                                <h3 className="profileType">{userProfile.coachType?.name}</h3>
                                <p>✉️  {userProfile.email}</p>
                                <p>📍 {userProfile.location}</p>
                            </div>
                    </div>
                    <div className="smallerDetails">
                        <p className="bolder">Website: </p>
                        <p>{userProfile.website}</p>
                        <p className="bolder">Taking NewClients: </p>
                        <p>{userProfile.takingClients? "Yes": "No"}</p>
                         <p className="bolder">Service Location: </p>
                            {
                                currentCoachLocations.map(
                                    (currentCLocation)=>{
                                        if(currentCLocation.userId === userProfile.userId){
                                            return <>
                                            <p className="locationList">•{currentCLocation.serviceLocation.name}</p>
                                            </>
                                        }
                                    }
                                )
                            }
                        <p className="bolder">Specialties: </p>
                        <p>{userProfile.specialties}</p>
                        <p className="bolder">About {userProfile.firstName}:</p>
                        <p> {userProfile.bio}</p>
                        <p className="bolder">Events + Courses: </p>
                            {
                                events.map(
                                    (event)=>{
                                        if(event.userId === userProfile.userId){
                                            return <Link className="linkMyWay" to={`/eventsCourses/viewEvent/${event.id}`}>{event.name}</Link>
                                        }
                                    }
                                )
                            }
                            
                    </div>
                    <div className="btnSection">
                        <button className = "btn" onClick={addFavorite}>❤️</button>
                        <button className = "btn" onClick={() => history.push(`/connect`)}>Connect with Others</button>
                    </div>
                     
                </div>
            }
        </>
    )
}
