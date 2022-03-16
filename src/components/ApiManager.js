//get all the data from API
export const getAllUsers = () => {
    return fetch ("http://localhost:8088/users")
    .then(res => res.json())
}

export const getAllServiceLocations = () => {
    return fetch("http://localhost:8088/serviceLocations")
    .then(res => res.json())
}

export const getAllCoachTypes = () => {
    return fetch("http://localhost:8088/coachTypes")
    .then(res => res.json())
}

export const getAllEventTypes = () => {
    return fetch("http://localhost:8088/eventTypes")
    .then(res => res.json())
}

export const getAllEvents = () => {
    return fetch("http://localhost:8088/events?_expand=eventType&_expand=user")
    .then(res => res.json())
}
export const getAllUserProfiles = () => {
    return fetch("http://localhost:8088/userProfiles?_expand=event&_expand=coachType")
    .then(res => res.json())
}

//delete event
export const DeleteEvent = (id) => {
    return fetch(`http://localhost:8088/events/${id}`, {
        method: "DELETE"
    })
}

// export const getCurrentEvent = (id) => {
//     return fetch (`http://localhost:8088/events/${id}`)
//     .then (res => res.json())
// }