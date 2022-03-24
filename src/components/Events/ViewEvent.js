import React, { useState, useEffect} from "react"
import { useParams } from "react-router"
import { getAllEventTopics, getAllUsers } from "../ApiManager"


export const ViewEvent = () => {
    //get state of event Object
    const [ eventObject, setEventObject] = useState({})
    const [ users, setUsers ] = useState([])
    const [ eventTopics, setEventTopics ] = useState([])

    const { eventId } = useParams()

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
        <h2>Particular Event</h2>
        <div>
            <h2>{eventObject.name}</h2>
        </div>
        </>
    )
}