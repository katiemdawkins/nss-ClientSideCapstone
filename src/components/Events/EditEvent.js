import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { getAllEventTopics, getAllEventTypes, getCurrentEvent } from "../ApiManager";


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
        <form className="ticketForm">
            <h2 className="ticketForm__title">Create a New Event or Course</h2>
            
            <fieldset>
                <div className="form-group">
                    <label>Name of Event or Course:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.name=evt.target.value
                                setEvent(copy)
                            }
                        }
                        required autoFocus
                        id="outlined-required"
                        className="form-control"
                        value = {event.name}
                        />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                    <label>Type of Event or Course:</label>
                             <select
                                onChange={
                                    (evt) => {
                                    const copy = {...event}
                                    copy.eventTypeId = evt.target.value
                                    setEvent(copy)
                                    }
                                }
                                required autoFocus
                                className="form-select"
                                value={event.eventTypeId}
                                >
                                <option value={event.eventTypeId}>{event.eventType?.name}</option>
                                {eventTypes.map((eventType) =>{
                                   return <option value={eventType.id} key={eventType.id}>
                                        {eventType.name}</option>
                                    
                                })}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                    <label>Event or Course Topic:</label>
                             <select
                                onChange={
                                    (evt) => {
                                    const copy = {...event}
                                    copy.eventTopicId = evt.target.value
                                    setEvent(copy)
                                    }
                                }
                                required autoFocus
                                className="form-select"
                                value={event.eventTopicId}
                            >
                                <option value={event.eventTopicId}>{event.eventTopic?.name}</option>
                                {eventTopics.map((eventTopic) =>{
                                    return <option key ={eventTopic.id} value={eventTopic.id}>
                                        {eventTopic.name}
                                    </option>
                                })}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                <div className="form-group">
                <label>Location of Event or Course:</label>
                    <input 
                        onChange={
                            (evt) =>{
                                const copy = {...event}
                                copy.location = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required autoFocus
                        className="form-control"
                        value={event.location}
                        
                        />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-field">
                <label>Date of Event or Course:</label>
                    <input 
                        onChange={
                            (evt) =>{
                                const copy = {...event}
                                copy.date = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required autoFocus
                        className="form-control"
                        value= {event.date} 
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-field">
                <label>Details for your Event or Course:</label>
                    <textarea 
                        onChange={
                            (evt) =>{
                                const copy = {...event}
                                copy.details = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required autoFocus
                        className="form-control"
                        value = {event.details}
                    />
                </div>
            </fieldset>

            <button onClick={editCurrentEvent}className="btn btn-primary">
                Publish Event
            </button>
        </form>
    )
}