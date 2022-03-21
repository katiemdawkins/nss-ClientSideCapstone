import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getAllEventTopics, getAllEventTypes } from "../ApiManager";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./CreateEvent.css"
import { MenuItem } from "@mui/material";


export const CreateEvent = () =>{
    //create a useState variable to hold transient state object
    const [ newEvent, updateNewEvent ] = useState({
        userId: 1,
        name: "",
        eventTypeId: 1,
        eventTopicId: 1,
        location: "",
        date: "",
        details: ""
    })
    const[ eventTypes, setEventTypes ]= useState([])
    const [ eventTopics, setEventTopics ] = useState([])

    const history = useHistory()
    
    //import eventTypes
    useEffect(
        ()=>{
            getAllEventTypes()
            .then((eTypes)=>{
                setEventTypes(eTypes)
            })
        },
        []
    )

    useEffect(
        ()=>{
            getAllEventTopics()
            .then((data)=>{
                setEventTopics(data)
            })
        },
        []
    )

    //create a function that submits the new event 
    //and saves the new event object and posts to the api
    //push to /eventsCourses 

    const submitNewEvent = (evt) => {
        evt.preventDefault()

        const newEventObj = {
            userId: parseInt(localStorage.getItem("in_my_lane_coach")),
            name: newEvent.name,
            eventTypeId: parseInt(newEvent.eventTypeId),
            eventTopicId: parseInt(newEvent.eventTopicId),
            location: newEvent.location,
            date: newEvent.date,
            details: newEvent.details
        }
        
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEventObj)
        }
        return fetch("http://localhost:8088/events", fetchOption)
        .then(() =>{
            history.push("/eventsCourses")
        })
    }



    //return the form 
    return(
        <Box className="ticketForm"
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                }}
                noValidate
                autoComplete="off"
            >
            <h2 className="ticketForm__title">Create a New Event or Course</h2>
            <fieldset>
                <div className="form-group">
                    <TextField
                        onChange={
                            (evt) => {
                                const copy = {...newEvent}
                                copy.name=evt.target.value
                                updateNewEvent(copy)
                            }
                        }
                        required 
                        id="outlined-required"
                        label="What's the name of your event?"
                        className="form-control"
                        placeholder="Enter your event or course name here"
                        />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                             <TextField
                                onChange={
                                    (evt) => {
                                    const copy = {...newEvent}
                                    copy.eventTypeId = evt.target.value
                                    updateNewEvent(copy)
                                    }
                                }
                                id="outlined-select-type"
                                select
                                label="What type of event are you hosting?"
                                required
                                className="form-control"
                                >

                                {eventTypes.map((eventType) =>(
                                    <MenuItem value={eventType.id} key={eventType.id}>
                                        {eventType.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                             <TextField
                                onChange={
                                    (evt) => {
                                    const copy = {...newEvent}
                                    copy.eventTopicId = evt.target.value
                                    updateNewEvent(copy)
                                    }
                                }
                                id="outlined-select-topic"
                                select
                                label="What's the topic of your event?"
                                required
                                className="form-control"
                            >
                                {eventTopics.map((eventTopic) =>(
                                    <MenuItem key ={eventTopic.id} value={eventTopic.id}>
                                        {eventTopic.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                    </div>
                </fieldset>

            <fieldset>
                <div className="form-group">
                    <TextField 
                        onChange={
                            (evt) =>{
                                const copy = {...newEvent}
                                copy.location = evt.target.value
                                updateNewEvent(copy)
                            }
                        }
                        required 
                        id="outlined-required"
                        label="Location"
                        className="form-control"
                        placeholder="Enter the location of your event or course here"
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-field">
                    <TextField 
                        onChange={
                            (evt) =>{
                                const copy = {...newEvent}
                                copy.date = evt.target.value
                                updateNewEvent(copy)
                            }
                        }
                        required
                        id="outlined-multiline-flexible"
                        label="Date + Time of Event"
                        multiline
                        maxRows={4}
                        className="form-control"
                        placeholder="Enter the date and time of your event here. Hosting a course? List relevant dates, or sign up dates here." 
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-field">
                    <TextField 
                        onChange={
                            (evt) =>{
                                const copy = {...newEvent}
                                copy.details = evt.target.value
                                updateNewEvent(copy)
                            }
                        }
                        required
                        id="outlined-multiline-flexible"
                        label="Event Description"
                        multiline
                        maxRows={4}
                        className="form-control"
                        placeholder="Give us a brief description of your event or course. Who is it for? what will it cover?" 
                    />
                </div>
            </fieldset>

            <button onClick={submitNewEvent}className="btn btn-primary">
                Publish Event
            </button>
        </Box>
    )
}