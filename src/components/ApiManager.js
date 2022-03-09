
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
    return fetch("http://localhost:8088/events")
    .then(res => res.json())
}
export const getAllUserProfiles = () => {
    return fetch("http://localhost:8088/userProfiles?_expand=event&_expand=coachType&_expand=serviceLocation")
    .then(res => res.json())
}