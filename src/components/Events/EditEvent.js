import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { getAllEventTypes, getCurrentEvent } from "../ApiManager";

//create a function to edit events
export const EditEvent = () => {
    const [ event, setEvent ] = useState({})
    const[ eventTypes, setEventTypes ]= useState([])

    const { eventId } = useParams()
    const history = useHistory()

//fetch individual event
useEffect(
    () => {
        return fetch(`http://localhost:8088/events/${eventId}?_expand=eventType&_expand=user`)
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

    // function to edit - PUT
    const editCurrentEvent = (evt) => {
        evt.preventDefault()
        
        const edittedEventObj = {
            userId: parseInt(localStorage.getItem("in_my_lane_coach")),
            name: event.name,
            eventTypeId: parseInt(event.eventTypeId),
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
                    <label htmlFor="eventName">What's the name of your event?</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...event}
                                copy.name = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        value= {event.name}
                            />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="eventTypeId">What type of event are you hosting? </label>
                             <select
                                onChange={
                                    (evt) => {
                                        const copy = {...event}
                                        copy.eventTypeId = evt.target.value
                                        setEvent(copy)
                                        }
                                }
                                required autoFocus
                                className="form-control"
                                value= {event.eventTypeId}
                                >
                                
                                {
                                eventTypes.map((eventType) =>{
                                return <option value={eventType.id} key={eventType.id}>{eventType.name}</option>
                                })}
                            </select>
                    </div>
                </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input 
                        onChange={
                            (evt) =>{
                                const copy = {...event}
                                copy.location = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={event.location} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date + Time of Event:</label>
                    <textarea 
                        onChange={
                            (evt) =>{
                                const copy = {...event}
                                copy.date = evt.target.value
                                setEvent(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={event.date} />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="details">Tell the people what they need to know about your event or course:</label>
                    <textarea 
                        onChange={ (evt) =>{
                            const copy = {...event}
                            copy.details = evt.target.value
                            setEvent(copy)
                        }}
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={event.details} />
                </div>
            </fieldset>

            <button onClick={editCurrentEvent}className="btn btn-primary">
                Publish Event
            </button>
        </form>
    )
}