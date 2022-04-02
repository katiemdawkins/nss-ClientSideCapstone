import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { DeleteCoachLocationObj, getAllCoachTypes, getAllServiceLocations, getAllUsers, getCoachLocations } from "../ApiManager";
import "./ProfileForm.css"
import UploadImages from "./UpLoadImg";

///create a new userProfile 
export const EditProfileForm = () => {
    const [ currentUserProfile, updateCurrentUserProfile ] = useState({
            userId: 1,
            coachTypeId: 1,
            imageURL:"",
            firstName: "",
            lastName: "",
            specialties: "",
            website: "",
            email: "",
            takingClients: false,
            bio: "",
            location: ""
    })

    const [ selectedServiceLocations, setSelectLocations ] = useState( new Set())
    const [ coachTypes, setCoachTypes] = useState([])
    const [ serviceLocations, setServiceLocations ] = useState([])
    const [ coachLocationObjects, setCoachLocationObjects ] = useState([])

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    const history = useHistory()
    const { userId } = useParams()
    

    useEffect(
        ()=>{
            return fetch(`http://localhost:8088/userProfiles/${userId}`)
            .then(res => res.json())
            .then((data)=>{
                updateCurrentUserProfile(data)
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
        
        //step 1 get all objects for current user from json server
        //step 2 iterate the array
        //step 3  delete each one 
        const locationObjects = () => {
            return fetch(`http://localhost:8088/coachLocations?userId=${userId}`)
            .then(res => res.json())
            .then((data)=>{
                
                setCoachLocationObjects(data)
                data.forEach(locationObj =>{
                
                    DeleteCoachLocationObj(locationObj.id)
                })
            })
        }

        locationObjects()
        
        //step 1 interate the set of service locations
            //do a post operation to coachLocations for each item in that set (if they click 1 box, 1 Post happens)
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
            
        })
        //step 2 PUT to user profile for all other input fields  get rid of the serviceLocationId
        const newProfile = {
            userId: parseInt(localStorage.getItem("in_my_lane_coach")),
            coachTypeId: parseInt(currentUserProfile.coachTypeId),
            imageURL: currentUserProfile.imageURL,
            firstName: currentUserProfile.firstName,
            lastName: currentUserProfile.lastName,
            specialties: currentUserProfile.specialties,
            website: currentUserProfile.website,
            email: currentUserProfile.email,
            takingClients: currentUserProfile.takingClients,
            bio: currentUserProfile.bio,
            location: currentUserProfile.location
        }

        return fetch(`http://localhost:8088/userProfiles/${userId}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProfile)

        })
        .then (()=>{
            history.push(`/myProfile/${parseInt(localStorage.getItem("in_my_lane_coach"))}`)
        })
    }

    return (
            <form className= "profileForm">
                <h2 className= "profileFormTitle">Edit Your Profile</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                            <input 
                                onChange={
                                    (evt) => {
                                        const copy = {...currentUserProfile}
                                        copy.firstName = evt.target.value
                                        updateCurrentUserProfile(copy)
                                    }
                                }
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={currentUserProfile.firstName}
                            />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...currentUserProfile}
                                    copy.lastName = evt.target.value
                                    updateCurrentUserProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={currentUserProfile.lastName}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="coachType">Coach Type:</label>
                             <select
                                onChange={
                                    (evt) => {
                                    const copy = {...currentUserProfile}
                                    copy.coachTypeId = evt.target.value
                                    updateCurrentUserProfile(copy)
                                    }
                                }
                                required autoFocus
                                className="form-select"
                                placeholder="Select your coach type">
                                <option value={currentUserProfile.coachTypeId}>What type of coach are you?</option>    
                                {coachTypes.map((coachType) =>{
                                return <option value={coachType.id} key={coachType.id}>{coachType.name}</option>
                                })}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                      <UploadImages obj={currentUserProfile} update ={updateCurrentUserProfile} />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="custom-control custom-checkbox">
                        <label className ="custom-control-label" htmlFor="customCheck1">Services Clients:</label>
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
                                className="custom-control-input"
                                id="customCheck1"
                                type="checkbox"
                                value={currentUserProfile.serviceLocationId}
                                
                                />
                            <label className="custom-control-label" htmlFor="customCheck1">{serviceLocation.name}
                            </label>
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
                                    const copy = {...currentUserProfile}
                                    copy.specialties = evt.target.value
                                    updateCurrentUserProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={currentUserProfile.specialties}
                        />
                    </div>
                </fieldset> 

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Website:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...currentUserProfile}
                                    copy.website = evt.target.value
                                    updateCurrentUserProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={currentUserProfile.website}
                        />
                    </div>
                </fieldset>  

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email">Email:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...currentUserProfile}
                                    copy.email = evt.target.value
                                    updateCurrentUserProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            value= {currentUserProfile.email}
                        />
                    </div>
                </fieldset>

                <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Accepting Clients:</label>
                    <input 
                        onChange={
                            (evt) =>{
                                const copy = {...currentUserProfile}
                                copy.takingClients = evt.target.checked
                                updateCurrentUserProfile(copy)
                            }
                        }
                        type="checkbox"
                        className="form-check-input"
                        value={currentUserProfile.takingClients} />
                </div>
            </fieldset>

            

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Location:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...currentUserProfile}
                                    copy.location = evt.target.value
                                    updateCurrentUserProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            value={currentUserProfile.location}
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
                                    const copy = {...currentUserProfile}
                                    copy.bio = evt.target.value
                                    updateCurrentUserProfile(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            id="bio"
                            rows="5"
                            value={currentUserProfile.bio}
                        />
                    </div>
                </fieldset>

                <button onClick={submitProfile}className="btn btn-primary">
                    Update your Profile
                </button>
            </form>
    )
}

