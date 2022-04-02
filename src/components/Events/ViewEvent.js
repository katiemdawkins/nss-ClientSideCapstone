import React, { useState, useEffect} from "react"
import { useParams, useHistory } from "react-router"
import { getAllEventTopics, getAllUsers } from "../ApiManager"


export const ViewEvent = () => {
    //get state of event Object
    const [ eventObject, setEventObject] = useState({})
    const [ users, setUsers ] = useState([])
    const [ eventTopics, setEventTopics ] = useState([])

    const { eventId } = useParams()
    const history = useHistory()

    useEffect(
        ()=>{
            return fetch (`http://localhost:8088/events/${eventId}?_expand=eventType&_expand=user&_expand=eventTopic`)
            .then(res => res.json())
            .then((data)=>{
                setEventObject(data)
            })
        },
        [eventId]
    )

    useEffect(
        ()=>{
            getAllUsers()
            .then((data)=>{
                setUsers(data)
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

    return (
        <>
        <h2 className="singleEventDetails">Event Details...</h2>
        <div className="singleEventCourse" key={eventObject.id}>
            <h3 key={eventObject.name}>{eventObject.name}</h3>
            <p>Hosted By: {eventObject.user?.firstName} {eventObject.user?.lastName}</p>
            <p>Event Topic: {eventObject.eventTopic?.name}</p>
            <p>Type of Event: {eventObject.eventType?.name}</p>
            <p>Where? {eventObject.location}</p>
            <p>When? {eventObject.date}</p>
            <p>Details: {eventObject.details}</p>
        </div>
        <div className="evtCrsBtn">
            <button onClick={()=> history.push(`/eventsCourses`)}>View Other Events + Courses</button>
        </div>
        </>
    )
}