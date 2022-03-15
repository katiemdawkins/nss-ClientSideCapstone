import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { getAllUserProfiles, getAllUsers } from "../ApiManager"
import { UserProfile } from "./UsersProfile"

//create a function that takes a user to their profile
//if the user is already in the database with userProfile it will show edit/view profile button
//if user doesn't have a user profile it will show create profile button 

export const MyProfile = () => {
//get current user object? 
    const [ users, setUsers ] = useState([])
    const [ userProfile, setProfile ] = useState({})
    
    const history = useHistory()
    const { userId } = useParams()

    //fetch current user
    useEffect(
        () =>{
            getAllUsers()
            .then ((userData)=>{
                setUsers(userData)
            })
        },
        []
    )
    useEffect (
        ()=>{
           return fetch (`http://localhost:8088/userProfiles/${userId}?_expand=event&_expand=coachType&_expand=serviceLocation`)
           .then(res => res.json())
           .then((data)=>{
               setProfile(data)
           })
        },
        [userId]
    )



    //return
    //hi user.first name 
    //create your profile here button
    //or view/edit your profile here button

    return (
        <>
        {
            users.map(
                (user) =>{
                    if(user.id === parseInt(localStorage.getItem("in_my_lane_coach"))){
                    return <div key={`user--${user.id}`}>
                        <h2>Welcome to your profile page, {user.firstName}</h2>
                        <button className = "btn" onClick={() => history.push(`/myProfile/create/${parseInt(localStorage.getItem("in_my_lane_coach"))}`)}>Edit Your Profile</button>
                    </div>
                    }
                }

                )
        }
        {
           <div className="profileInfo" key={`user--${userProfile?.id}`}>
                 <h2>{userProfile?.firstName} {userProfile?.lastName}</h2>
                    <h3>{userProfile.coachType?.name}</h3>
                    <p>Specialties: {userProfile?.specialties}</p>
                    <p>Website: {userProfile?.website}</p>
                    <p>Email: {userProfile?.email}</p>
                    <p>Taking NewClients: {userProfile?.takingClients? "Yes": "No"}</p>
                    <p>Works with clients: {userProfile.serviceLocation?.name ? `In Person`: "-In Person" }
                    {userProfile.serviceLocation?.name ? `Live Video`: " -Live Video" }
                    {userProfile.serviceLocation?.name ? `Remote Online`: " -Remote Online" }</p>
                    <p>Location: {userProfile?.location}</p>
                    <p>Bio: {userProfile?.bio}</p>
                    <p>Events + Courses: {userProfile.event?.name}</p>
           </div>
        }
        </>
    )
}
// {
//     userProfiles.map(
//         (userP)=>{
//             if(userP.userId === parseInt(localStorage.getItem("in_my_lane_coach"))){
//                 return <button>View Profile</button>
//             }
//         }
//     )
// }