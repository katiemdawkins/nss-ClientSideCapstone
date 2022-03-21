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
    const [ allUserProfiles, setAllUserProfiles ] = useState([])
    
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
    //get specific userProfile
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

    //get all user profiles
    useEffect(
        ()=>{
            getAllUserProfiles()
            .then((data)=>{
                setAllUserProfiles(data)
            })
        },
        []
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
                    if(user.id === parseInt(localStorage.getItem("in_my_lane_coach")) && user.id != userProfile?.userId){
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
                <div className="bigInfo">
                    <div className="profilePicture">
                        <img src = {userProfile?.imageURL} alt= "Profile picture"/>
                    </div>

                    <div className="nameTypeBio">
                        <h2 className="profileName">{userProfile?.firstName} {userProfile?.lastName}</h2>
                        <h3 className="profileType">{userProfile?.coachType?.name}</h3>
                        <p>{userProfile?.bio}</p>
                    </div>
                </div>
                <div className="userDetails">
                        <p className="bolder">Specialties</p>
                        <p>{userProfile?.specialties}</p>
                        <p className="bolder">Website</p>
                        <p>{userProfile?.website}</p>
                        <p className="bolder">Email</p>
                        <p>{userProfile?.email}</p>
                        <p className="bolder">Taking New Clients?</p>
                        <p>{userProfile?.takingClients? "Yes": "No"}</p>
                        <p className="bolder">Service Location</p>
                            {
                                currentCoachLocations.map(
                                    (currentCLocation)=>{
                                        if(currentCLocation?.userId === userProfile?.userId){
                                            return <>
                                            <p>{currentCLocation.serviceLocation?.name}</p>
                                            </>
                                        }
                                    }
                                )
                            }
                        <p className="bolder">Location</p>
                        <p>{userProfile?.location}</p>
                        <p className="bolder">Events + Courses</p>
                            {
                                events.map(
                                    (event)=>{
                                        if(event?.userId === userProfile?.userId){
                                            return <p>{event?.name}</p>
                                        }
                                    }
                                )
                            }
                    </div>
                    <div className="buttonEdit">
                        {
                            allUserProfiles.map(
                                (theUserProfile)=>{
                                    if(theUserProfile?.userId === parseInt(localStorage.getItem("in_my_lane_coach"))){
                                        return <button className = "btn" onClick={() => history.push(`/myProfile/edit/${parseInt(localStorage.getItem("in_my_lane_coach"))}`)}>Edit Your Profile</button>
                                    }
                                }
                            )
                        } 
                    </div>
            </div>
        }   
        </>
    )
}
