import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { DeleteEvent, getAllEvents, getAllEventTypes, getAllUserProfiles, getAllUsers } from "../ApiManager"
import { Link } from "react-router-dom"
import "./Events.css"

export const DisplayEvents = () => {
    const [ events, setEvents] = useState([])
    const [ query, setQuery ] = useState("")
    const [ userProfiles, setUserProfiles ] = useState([])

    const history = useHistory()


    const eventsState = () => {
        getAllEvents()
        .then((eventData) => {
            setEvents(eventData)
            })
    }
    
    useEffect(
        ()=>{
            eventsState()
        },
        []
    )

    useEffect(
        ()=>{
            getAllUserProfiles()
            .then((data)=>{
                setUserProfiles(data)
            })
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
            <h2 className ="title">Events and Courses</h2>
            <div className="align-right">
                <button className="evtBtn"onClick={()=> history.push("/eventsCourses/create")}>Add Your Event</button>
            </div>
        {
        <div className= "event-page">
            <div className="searchBar">
                    <label className="searchLable">Search for a specific kind of event: </label>
                    <input className="searchInput"placeholder="Enter event or course topic" onChange={event=> setQuery(event.target.value)}></input>
            </div>
        
            <div className="eventCards">
                {
                    events.filter(event=>{
                        if(query === ''){
                            return event
                        } else if (event.eventTopic.name.toLowerCase().includes(query.toLowerCase())){
                            return event
                        }
                    }).map(
                        (event, index)=>{
                            if(event.userId === parseInt(localStorage.getItem("in_my_lane_coach"))){
                                return <div key={index}>
                                <div className="eventCourse" key={`event--${event.id}`}>
                                <h3>{event.name}</h3>
                                <p>Event Topic: {event.eventTopic.name}</p>
                                {
                                    userProfiles.map((userProfile)=>{
                                        if(userProfile.userId === event.userId){
                                            return <p>Hosted by: 
                                                    <Link className="evtLinkStyle" to={`/connect/${userProfile.id}`}>{event.user.firstName} {event.user.lastName}
                                                    </Link>
                                                </p>
                                        }
                                        }
                                    )
                                }
                                <p>Type of Event: {event.eventType.name}</p>
                                <p>Where? {event.location}</p>
                                <p>When? {event.date}</p>
                                <p>Details: {event.details}</p>
                                <div className="buttons">
                                    <button onClick={()=>{
                                        deleteMyEvent(event.id)
                                        }}>Delete Event
                                    </button>
                                    <button onClick={()=>{
                                        history.push(`/eventsCourses/edit/${event.id}`)
                                        }}>Edit Event
                                    </button>

                                </div>
                            </div>
                            </div>
                            } else {
                                return <div key={index}>
                                <div className="eventCourse" key={`event--${event.id}`}>
                                <h3>{event.name}</h3>
                                <p>Event Topic: {event.eventTopic.name}</p>
                                {
                                    userProfiles.map((userProfile)=>{
                                        if(userProfile.userId === event.userId){
                                            return <p>Hosted by: <Link className="evtLinkStyle" to={`/connect/${userProfile.id}`}>{event.user.firstName} {event.user.lastName}</Link></p>
                                        }
                                        }
                                    )
                                }
                                <p>Type of Event or Course: {event.eventType.name}</p>
                                <p>Where? {event.location}</p>
                                <p>When? {event.date}</p>
                                <p>Details: {event.details}</p>
                                </div>
                                </div>
                            }
                        }
                    )
                }
            </div>
        </div>
        }
        </>
    )
}
