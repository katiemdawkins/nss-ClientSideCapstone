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
    return fetch("http://localhost:8088/events?_expand=eventType&_expand=user&_expand=eventTopic")
    .then(res => res.json())
}
export const getAllUserProfiles = () => {
    return fetch("http://localhost:8088/userProfiles?_expand=coachType")
    .then(res => res.json())
}

export const getCoachLocations = () => {
    return fetch("http://localhost:8088/coachLocations")
    .then(res => res.json())
}

export const getAllEventTopics = () =>{
    return fetch (`http://localhost:8088/eventTopics`)
    .then (res =>res.json())
}

export const getAllUserFavorites = () =>{
    return fetch (`http://localhost:8088/userFavorites?_expand=user&_expand=userProfile`)
    .then(res => res.json())
}

//delete event
export const DeleteEvent = (id) => {
    return fetch(`http://localhost:8088/events/${id}`, {
        method: "DELETE"
    })
}
//delete previous coach locations
export const DeleteCoachLocationObj = (id) =>{
    return fetch(`http://localhost:8088/coachLocations/${id}`,{
    method: "DELETE"
    })
}

//delete users favoritee
export const DeleteMyFavorite = (id) => {
    return fetch(`http://localhost:8088/userFavorites/${id}`,{
        method: "DELETE"
    })
}

// export const getCurrentEvent = (id) => {
//     return fetch (`http://localhost:8088/events/${id}`)
//     .then (res => res.json())
// }