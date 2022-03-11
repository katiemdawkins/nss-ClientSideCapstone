import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { getAllCoachTypes, getAllServiceLocations, getAllUsers } from "../ApiManager";
import "./ProfileForm.css"

//////////////Thursday ----------------------------
///figure out how to create a new userProfile 
export const ProfileForm = () => {
    const [ userProfile, updateProfile ] = useState({
        // userId: 1,
        // coachTypeId: 1,
        // serviceLocationId: 1,
        // firstName:"",
        // lastName:"",
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
    const [ serviceLocations, setServiceLocations ] = useState([])
    
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
    useEffect(
        getAllServiceLocations()
        .then((locations)=>
        setServiceLocations(locations))
    )
    //create function to submit new form
    const submitProfile =(evt) => {
        evt.preventDefault()

        const newProfile = {
            userId: parseInt(localStorage.getItem("in_my_lane_coach")),
            coachTypeId: parseInt(userProfile.coachTypeId),
            serviceLocationId: 1,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            specialties: userProfile.specialties,
            website: userProfile.website,
            email: userProfile.email,
            takingClients: userProfile.takingClients,
            bio: userProfile.bio,
            location: userProfile.location,
            eventId: 3
        }

        const fetchOption = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)
        }
        return fetch("http://localhost:8088/userProfiles". fetchOption)
        .then (()=>{
            history.push("/myProfile")
        })
    }
/////////////////////////////////////////////////MONDAY!!!!!!!! figure out radio button 
    return (
        <>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.firstName = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.lastName = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="coachType">Coach Type: </label>
                             <select
                                onChange={
                                    (evt) => {
                                    const copy = {...userProfile}
                                    copy.coachTypeId = evt.target.value
                                    updateProfile(copy)
                                    }
                                }
                                required autoFocus
                                className="form-control"
                                placeholder="Select your coach type">
                                <option value="0">Choose your coach type...</option>    
                                {coachTypes.map((coachType) =>{
                                return <option value={coachType.id} key={coachType.id}>{coachType.name}</option>
                                })}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="specialties">Specialties:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.specialties = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Share specialties here"
                        />
                    </div>
                </fieldset> 

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Website:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.website = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="www.website.com"
                        />
                    </div>
                </fieldset>  

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email">Email:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.email = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="email@email.com"
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

            <fieldset>
                        {serviceLocations.map(
                            (serviceLocation)=> (
                                
                    <div className="form-group">
                        <label htmlFor="serviceLocation">How do you meet with clients? </label>
                                <input 
                                    onChange={
                                        (evt) => {
                                            const copy = {...userProfile}
                                            copy.serviceLocationId = evt.target.value
                                            updateProfile(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="radio"
                                    className="form-control"
                                    value={serviceLocation.id}
                                />
                    </div>
                            )
                        )}
                </fieldset>

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Location:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.location = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Enter location here"
                        />
                        <p>Even if you coach exclusively online, it can be helpful for others to know where you're coaching from. </p>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="bio">Bio:  </label>
                        <textarea 
                            onChange={
                                (evt) => {
                                    const copy = {...userProfile}
                                    copy.bio = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="What would you like to share about your background and approach to coaching?"
                        />
                    </div>
                </fieldset>

                <button className="btn btn-primary">
                Update your Profile
            </button>
            </form>
        </>
    )
}