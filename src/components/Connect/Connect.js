import React, { useState, useEffect} from "react"
import { getAllUserProfiles, getCoachLocations} from "../ApiManager"
import { Link } from "react-router-dom"
import "./connect.css"

export const MiniProfiles = () => {
    const [ userProfiles, setUserProfiles] = useState([])
    const [ coachLocations, setCoachLocations ] = useState([])
    const [ query, setQuery ] = useState("")


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
            <div>
                <input placeholder="Search for a specific coach type" onChange={event=> setQuery(event.target.value)}></input>
            {
                userProfiles.filter(userProfile => {
                    if(query === ''){
                        return userProfile
                    } else if (userProfile.coachType.name.toLowerCase().includes(query.toLowerCase())){
                        return userProfile
                    }
                }).map((userProfile, index)=>(
                    <div key={index} className="connectProfileInfo">
                        <div className="connectInside">
                        <h2 className="linkToProfile"><Link to={`/connect/${userProfile.id}`}>{userProfile.firstName} {userProfile.lastName}</Link></h2>
                            <h3>{userProfile.coachType.name}</h3>
                            <p>Taking New Clients: {userProfile.takingClients? "Yes": "No"}</p>
                            <p>{userProfile.location}</p>
                        </div>
                        <div className="connectInside">
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
                    </div>
                ))
            }
            </div>
           
        }

        </>
    )
}

        // {
        //     userProfiles.map(
        //         (userProfile) => {
        //             return <div className="connectProfileInfo" key={`user--${userProfile.id}`}>
        //                     <h2 className="linkToProfile"><Link to={`/connect/${userProfile.id}`}>{userProfile.firstName} {userProfile.lastName}</Link></h2>
        //                     <h3>{userProfile.coachType.name}</h3>
        //                     <p>Taking New Clients: {userProfile.takingClients? "Yes": "No"}</p>
        //                     <p>{userProfile.location}</p>
        //                     <p className="bolder">Services Clients: </p>
        //                     {
        //                         coachLocations.map(
        //                             (coachLocation)=>{
        //                             if (coachLocation.userId === userProfile.userId){
        //                                 return <p>{coachLocation.serviceLocation.name}</p>
        //                                 }
        //                             }
        //                         )
        //                     }
        //             </div>
        //             }
        //             )
        //     }