import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { getAllCoachTypes, getAllUsers } from "../ApiManager";

//////////////Thursday ----------------------------
///figure out how to create a new userProfile 
export const ProfileForm = () => {
    const [ userProfile, updateProfile ] = useState({
        // userId: 1,
        // coachTypeId: 1,
        // serviceLocationId: 1,
        // fullName:"",
        // specialties: "",
        // website: "",
        // email: "",
        // takingClients: false,
        // bio: "",
        // location: "",
        // eventId: 1
    })
 
    const history = useHistory()
    const [ coachTypes, setCoachTypes] = useState([])
    
    //import coach types 
    useEffect(
        ()=>{
            getAllCoachTypes()
            .then((coachTypes)=>{
                setCoachTypes(coachTypes)
            })
        },
        []
    )

    //get serviceLocations

    //create function to submit new form
    const submitProfile =(evt) => {
        evt.preventDefault()

        const newProfile = {
            userId: parseInt(localStorage.getItem("in_my_lane_coach")),
            coachTypeId: 1,
            serviceLocationId: 1,
            fullName:"",
            specialties: "",
            website: "",
            email: "",
            takingClients: false,
            bio: "",
            location: "",
            eventId: 1
        }

        const fetchOption = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)
        }
        return fetch("". fetchOption)
        .then (()=>{
            history.push("")
        })
    }

    return (
        <>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Full Name:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.fullName = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="First and Last Name"
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Coach Type: </label>
                             <select
                                onChange={
                                    (evt) => {
                                    const copy = {...userProfile}
                                    copy.locationId = evt.target.value
                                    updateProfile(copy)
                                    }
                                }
                                required autoFocus
                                className="form-control"
                                placeholder="Select your coach type">
                                {coachTypes.map((coachType) =>{
                                return <option key={coachType.id}>{coachType.name}</option>
                                })}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Website:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.fullName = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="First and Last Name"
                        />
                    </div>
                </fieldset>  

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Email:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.fullName = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="First and Last Name"
                        />
                    </div>
                </fieldset>

                <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Accepting Clients:</label>
                    <input 
                        onChange={
                            (evt) =>{
                                const copy = {...userProfile}
                                copy.takingClients = evt.target.checked
                                updateProfile(copy)
                            }
                        }
                        type="checkbox" />
                </div>
            </fieldset>
            </form>
        </>
    )
}