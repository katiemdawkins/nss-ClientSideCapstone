import React, { useState, useEffect} from "react"
import { useHistory } from "react-router"
import { getAllEvents } from "../ApiManager"
import "./Events.css"

export const DisplayEvents = () => {
    const [ events, setEvents] = useState([])
    const history = useHistory()

    useEffect(
        ()=>{
            getAllEvents()
            .then((eventData)=>{
                setEvents(eventData)
            })
        },
        []
    )

    return(
        <>
            <h2>Events and Courses</h2>
            <div>
                <button onClick={()=> history.push("/eventsCourses/create")}>Add Your Event</button>
            </div>
            {
                events.map(
                    (event)=>{
                        return <div className="eventCourse" key={`event--${event.id}`}>
                            <h3>{event.name}</h3>
                            <p>Hosted By: {event.user.firstName} {event.user.lastName}</p>
                            <p>{event.eventType.name}</p>
                            <p>{event.location}</p>
                            <p>{event.date}</p>
                            <p>{event.details}</p>
                        </div>
                    }
                )
            }
        </>
    )
}