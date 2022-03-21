import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { getAllEventTopics, getAllEventTypes, getCurrentEvent } from "../ApiManager";
import { MenuItem } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


//create a function to edit events
export const EditEvent = () => {
    const [ event, setEvent ] = useState({})
    const[ eventTypes, setEventTypes ]= useState([])
    const [ eventTopics, setEventTopics ] = useState([])

    const { eventId } = useParams()
    const history = useHistory()

//fetch individual event
useEffect(
    () => {
        return fetch(`http://localhost:8088/events/${eventId}?_expand=eventType&_expand=user&_expand=eventTopic`)
        .then(res => res.json())
        .then((evtData)=>{
            setEvent(evtData)
        })
    },
    [eventId]
)

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

    // function to edit - PUT
    const editCurrentEvent = (evt) => {
        evt.preventDefault()
        
        const edittedEventObj = {
            userId: parseInt(localStorage.getItem("in_my_lane_coach")),
            name: event.name,
            eventTypeId: parseInt(event.eventTypeId),
            eventTopicId: parseInt(event.eventTopicId),
            location: event.location,
            date: event.date,
            details: event.details
        }
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(edittedEventObj)
        })
        .then(()=> history.push("/eventsCourses"))
    }


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
                    <label>Name of Event or Course:</label>
                    <TextField
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.name=evt.target.value
                                setEvent(copy)
                            }
                        }
                        required 
                        id="outlined-required"
                        className="form-control"
                        value = {event.name}
                        />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                    <label>Type of Event or Course:</label>
                             <TextField
                                onChange={
                                    (evt) => {
                                    const copy = {...event}
                                    copy.eventTypeId = evt.target.value
                                    setEvent(copy)
                                    }
                                }
                                id="outlined-select-type"
                                select
                                required
                                className="form-control"
                                value={event.eventTypeId}
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
                    <label>Event or Course Topic:</label>
                             <TextField
                                onChange={
                                    (evt) => {
                                    const copy = {...event}
                                    copy.eventTopicId = evt.target.value
                                    setEvent(copy)
                                    }
                                }
                                id="outlined-select-topic"
                                select
                                required
                                className="form-control"
                                value={event.eventTopicId}
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
                <label>Location of Event or Course:</label>
                    <TextField 
                        onChange={
                            (evt) =>{
                                const copy = {...event}
                                copy.location = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required 
                        id="outlined-required"
                        className="form-control"
                        value={event.location}
                        
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-field">
                <label>Date of Event or Course:</label>
                    <TextField 
                        onChange={
                            (evt) =>{
                                const copy = {...event}
                                copy.date = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        className="form-control"
                        value= {event.date} 
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-field">
                <label>Details for your Event or Course:</label>
                    <TextField 
                        onChange={
                            (evt) =>{
                                const copy = {...event}
                                copy.details = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        className="form-control"
                        value = {event.details}
                    />
                </div>
            </fieldset>

            <button onClick={editCurrentEvent}className="btn btn-primary">
                Publish Event
            </button>
        </Box>
    )
}