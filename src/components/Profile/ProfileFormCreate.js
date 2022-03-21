import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { getAllCoachTypes, getAllServiceLocations, getAllUsers } from "../ApiManager";
import "./ProfileForm.css"
import UploadImages from "./UpLoadImg";

///create a new userProfile 
export const ProfileForm = () => {
    const [ userProfile, updateProfile ] = useState({
            userId: 1,
            imageURL: "",
            coachTypeId: 1,
            firstName: "",
            lastName: "",
            specialties: "",
            website: "",
            email: "",
            takingClients: false,
            bio: "",
            location: ""
    })
    const [ coachTypes, setCoachTypes] = useState([])
    const [ selectedServiceLocations, setSelectLocations ] = useState( new Set())
    const [ serviceLocations, setServiceLocations ] = useState([])

    const history = useHistory()
    const { userId } = useParams()
    

    useEffect(
        ()=>{
            return fetch(`http://localhost:8088/users/${userId}`)
            .then(res => res.json())
            .then((data)=>{
                updateProfile(data)
            })
        },
        [userId]
    )
    //get coachTypes 
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
        () =>{
            getAllServiceLocations()
            .then((locations)=>
            setServiceLocations(locations))
        },
        []
    )

    //create function to submit new profile
    const submitProfile =(evt) => {
        evt.preventDefault()

        selectedServiceLocations.forEach(serviceLocation => {

            const coachLocationObj = {
                userId: parseInt(localStorage.getItem("in_my_lane_coach")),
                serviceLocationId: serviceLocation
            }
            const fetchOption = {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(coachLocationObj)
            }
            return fetch ("http://localhost:8088/coachLocations", fetchOption)
            .then((data)=>{
                setSelectLocations(data)
            })
        })

        const newProfile = {
            userId: parseInt(localStorage.getItem("in_my_lane_coach")),
            imageURL: userProfile.imageURL,
            coachTypeId: parseInt(userProfile.coachTypeId),
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            specialties: userProfile.specialties,
            website: userProfile.website,
            email: userProfile.email,
            takingClients: userProfile.takingClients,
            bio: userProfile.bio,
            location: userProfile.location
        }

        const fetchOption ={
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)
        }
        return fetch("http://localhost:8088/userProfiles", fetchOption)
        .then (()=>{
            history.push(`/myProfile/${parseInt(localStorage.getItem("in_my_lane_coach"))}`)
        })
    }

    return (
            <form className= "profileForm">
                <h2 className= "profileFormTitle">Create Your Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
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
                            value= {userProfile.firstName}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
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
                                value= {userProfile.lastName}
                            />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="coachType">Coach Type:</label>
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
                      <UploadImages obj={userProfile} update ={updateProfile} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="serviceLocations">Services Clients:  </label>
                        {serviceLocations.map((serviceLocation) => {
                            return <>
                            <input 
                                onChange={
                                    (evt) => {
                                        const copy = new Set(selectedServiceLocations)
                                        if(copy.has(serviceLocation.id)){
                                            copy.delete(serviceLocation.id)
                                        }else{
                                            copy.add(serviceLocation.id)
                                        }
                                        setSelectLocations(copy)
                                    }
                                }
                                required autoFocus
                                type="checkbox"
                                className="form-control"
                                />
                            {serviceLocation.name}
                            </>
                        })}
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
                            placeholder="What do you specialize in within your field?"
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
                            placeholder="www.yourwebsite.com"
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
                            value={userProfile.email}
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
                        type="checkbox"
                         />
                </div>
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
                            placeholder = "What would you like people to know about your coaching style and history?"
                        />
                    </div>
                </fieldset>

                <button onClick={submitProfile}className="btn btn-primary">
                    Update your Profile
                </button>
            </form>
    )
}

