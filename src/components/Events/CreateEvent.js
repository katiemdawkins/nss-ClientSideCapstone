import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getAllEventTopics, getAllEventTypes } from "../ApiManager";


export const CreateEvent = () =>{
    //create a useState variable to hold transient state object
    const [ newEvent, updateNewEvent ] = useState({
        userId: 1,
        name: "",
        eventTypeId: 1,
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
        <form className="ticketForm">
            <h2 className="ticketForm__title">Create a New Event or Course</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">What's the name of your event?</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...newEvent}
                                copy.name=evt.target.value
                                updateNewEvent(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter your event or course name here"
                            />
                </div>
            </fieldset>

            <fieldset>
                    <div className="form-group">
                        <label htmlFor="eventTypeId">What type of event are you hosting? </label>
                             <select
                                onChange={
                                    (evt) => {
                                    const copy = {...newEvent}
                                    copy.eventTypeId = evt.target.value
                                    updateNewEvent(copy)
                                    }
                                }
                                required autoFocus
                                className="form-control"
                                placeholder="Select your event type">
                               <option value="0">Choose your event type...</option>
                                {
                                eventTypes.map((eventType) =>{
                                return <option value={eventType.id} key={eventType.id}>{eventType.name}</option>
                                })}
                            </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="eventTopicId">What's the topic of your event? </label>
                             <select
                                onChange={
                                    (evt) => {
                                    const copy = {...newEvent}
                                    copy.eventTopicId = evt.target.value
                                    updateNewEvent(copy)
                                    }
                                }
                                required autoFocus
                                className="form-control"
                                placeholder="Select your event topic...">
                               <option value="0">Choose your event topic...</option>
                                {
                                eventTopics.map((eventTopic) =>{
                                return <option value={eventTopic.id} key={eventTopic.id}>{eventTopic.name}</option>
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
                                const copy = {...newEvent}
                                copy.location = evt.target.value
                                updateNewEvent(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the location of your event here." />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date + Time of Event:</label>
                    <textarea 
                        onChange={
                            (evt) =>{
                                const copy = {...newEvent}
                                copy.date = evt.target.value
                                updateNewEvent(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter the date and time of your event here. Hosting a course? List relevant dates, or sign up dates here." />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="details">Tell the people what they need to know about your event or course:</label>
                    <textarea 
                        onChange={
                            (evt) =>{
                                const copy = {...newEvent}
                                copy.details = evt.target.value
                                updateNewEvent(copy)
                            }
                        }
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Give us a brief description of your event or course. Who is it for? what will it cover?" />
                </div>
            </fieldset>

            <button onClick={submitNewEvent}className="btn btn-primary">
                Publish Event
            </button>
        </form>
    )
}