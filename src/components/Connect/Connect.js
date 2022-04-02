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
                <h3 className="headerLine">Connect with our personal trainers, yoga instructors, physical therapists, mental health therapists, and registered dieticians.</h3>
                <div className="searchBar">
                    <label className="searchLable">Search for a specific kind of coach here: </label>
                    <input className="searchInput" placeholder="Enter coach type" onChange={event=> setQuery(event.target.value)}></input>
                </div>
            {
                userProfiles.filter(userProfile => {
                    if(query === ''){
                        return userProfile
                    } else if (userProfile.coachType.name.toLowerCase().includes(query.toLowerCase())){
                        return userProfile
                    }
                }).map((userProfile, index)=>(
                    <div className="allCards">
                        <div key={index} className="cardYAAAS">
                            <div className="gridQween">
                                <img className="card-img-top" src={userProfile.imageURL} alt="Card image cap" />
                                <div className="card-body">
                                    <h3 className="card-title">
                                        <Link className= "linkMyWay" to={`/connect/${userProfile.id}`}>
                                            {userProfile.firstName} {userProfile.lastName}
                                        </Link>
                                    </h3>
                                    <h5>{userProfile.coachType.name}</h5>
                                    <p className="card-text"><strong>Taking New Clients: </strong>  {userProfile.takingClients? " Yes": " No"}</p>
                                    <p className="card-text"><strong>Location:</strong>  {userProfile.location}</p>
                                    
                                    <p className="card-text"><strong>Services Clients: </strong></p>
                                        {
                                            coachLocations.map(
                                                (coachLocation)=>{
                                                    if (coachLocation.userId === userProfile.userId){
                                                        return <p className="locationList">  • {coachLocation.serviceLocation.name}</p>
                                                    }
                                                }
                                                )
                                        }
                                    <p className="card-text">{userProfile.website}</p>
                                </div>    
                                
                            </div>
                        </div>
                    </div>
                ))  
            }
            </div>
           
        }

        </>
    )
}

