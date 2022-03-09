import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { getAllUsers } from "../ApiManager";

export const ProfileForm = () => {
    const [ form, updateForm ] = useState({
        fullName:"",
        coachType: 1,
        specialties: "",
        website: "",
        email: "",
        takingClients: false,
        serviceLocation: 1,
        location: "",
        bio: "",
        event: 1
    })

    const [ users, setUsers ] = useState([])
    const history = useHistory()

    useEffect(
        ()=>{
            getAllUsers()
            .then((users)=>{
                setUsers(users)
            })
        },
        []
    )

    //create function to submit new form

    return (
        <>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Full Name:  </label>
                        <input 
                            onChange={
                                (evt) => {
                                    const copy = {...form}
                                    copy.fullName = evt.target.value
                                    updateForm(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="First and Last Name"
                        />
                    </div>
                </fieldset> 
            </form>
        </>
    )
}