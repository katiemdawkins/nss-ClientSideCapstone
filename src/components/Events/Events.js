import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { DeleteEvent, getAllEvents, getAllEventTypes, getAllUsers } from "../ApiManager"
import "./Events.css"

export const DisplayEvents = () => {
    const [ events, setEvents] = useState([])
    const history = useHistory()
    const { eventId } = useParams()


    const eventsState = () => {
        getAllEvents()
        .then(
            (eventData) => {
            setEvents(eventData)
            })
    }
    
    useEffect(
        ()=>{
            eventsState()
        },
        []
    )

    //create an edit function
    //create a delete function 
    const deleteMyEvent = (id) => {
        return DeleteEvent(id)
        .then((eventData) => {
            eventsState(eventData)
        })
    }
   

   

    return(
        <>
            <h2>Events and Courses</h2>
            <div>
                <button onClick={()=> history.push("/eventsCourses/create")}>Add Your Event</button>
            </div>
            {
                events.map(
                    (event)=>{
                        if(event.userId === parseInt(localStorage.getItem("in_my_lane_coach"))){
                        return <div className="eventCourse" key={`event--${event.id}`}>
                            <h3>{event.name}</h3>
                            <p>Hosted By: {event.user.firstName} {event.user.lastName}</p>
                            <p>{event.eventType.name}</p>
                            <p>{event.location}</p>
                            <p>{event.date}</p>
                            <p>{event.details}</p>
                            <button onClick={()=>{
                                deleteMyEvent(event.id)
                            }}>Delete Event</button>
                             <button onClick={()=>{
                                history.push(`/eventsCourses/edit/${event.id}`)
                            }}>Edit Event</button>
                        </div>
                        } else {
                            return <div className="eventCourse" key={`event--${event.id}`}>
                            <h3>{event.name}</h3>
                            <p>Hosted By: {event.user.firstName} {event.user.lastName}</p>
                            <p>{event.eventType.name}</p>
                            <p>{event.location}</p>
                            <p>{event.date}</p>
                            <p>{event.details}</p>
                            </div>
                        }
                    }
                )
            }
        </>
    )
}
