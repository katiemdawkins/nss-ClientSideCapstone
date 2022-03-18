import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { getAllEvents, getAllUserProfiles, getAllUsers } from "../ApiManager"
import { UserProfile } from "./UsersProfile"
import "./MyProfile.css"

//create a function that takes a user to their profile
//if the user is already in the database with userProfile it will show edit/view profile button
//if user doesn't have a user profile it will show create profile button 

export const MyProfile = () => {
//get current user object? 
    const [ users, setUsers ] = useState([])
    const [ userProfile, setProfile ] = useState({})
    const [ currentCoachLocations, setCurrentCoachLocations ] = useState([])
    const [ events, setEvents ] = useState([])
    
    const history = useHistory()
    const { userId } = useParams()

    //fetch current user
    useEffect(
        () =>{
            return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then((data)=>{
                setUsers(data)
            })
        },
        []
    )
    //get userProfiles
    useEffect (
        ()=>{
           return fetch (`http://localhost:8088/userProfiles?userId=${userId}&_expand=coachType`)
           .then(res => res.json())
           .then((data)=>{
               setProfile(data[0])
           })
        },
        [userId]
    )
    //fetch coachlocations state
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
            users.map(
                (user)=>{
                    if(user.id === parseInt(localStorage.getItem("in_my_lane_coach")) && user.id != userProfile.userId){
                        return <div key={`user--${user.id}`}>
                                <h2>Welcome to your profile page, {user.firstName}</h2>
                                <button className = "btn" onClick={() => history.push(`/myProfile/create/${parseInt(localStorage.getItem("in_my_lane_coach"))}`)}>Create Your Profile</button> 
                        </div>
                    } 
                }
            )
                    
        }
        {
           <div className="profileInfo" key={`user--${userProfile?.id}`}>
                 <h2 className="profileName">{userProfile?.firstName} {userProfile?.lastName}</h2>
                    <h3 className="profileType">{userProfile.coachType?.name}</h3>
                    <p>Specialties: {userProfile?.specialties}</p>
                    <p>Website: {userProfile?.website}</p>
                    <p>Email: {userProfile?.email}</p>
                    <p>Taking NewClients: {userProfile?.takingClients? "Yes": "No"}</p>
                    <p className="bolder">Service Location: </p>
                    {
                        currentCoachLocations.map(
                            (currentCLocation)=>{
                                if(currentCLocation.userId === userProfile.userId){
                                    return <>
                                    <p>{currentCLocation.serviceLocation?.name}</p>
                                    </>
                                }
                            }
                        )
                    }
                    <p>Location: {userProfile?.location}</p>
                    <p>Bio: {userProfile?.bio}</p>
                    {
                        events.map(
                            (event)=>{
                                if(event.userId === userProfile.userId){
                                    return <p>Events + Courses: {event.name}</p>
                                }
                            }
                        )
                    }
                    
                    {
                        users.map(
                            (user)=>{
                                if(user.id === userProfile.userId){
                                    return <button className = "btn" onClick={() => history.push(`/myProfile/edit/${parseInt(localStorage.getItem("in_my_lane_coach"))}`)}>Edit Your Profile</button>
                                }
                            }
                        )
                    }
                    
           </div>
        }       
        </>
    )
}
