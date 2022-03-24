import React, { useState, useEffect} from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { DeleteMyFavorite, getAllCoachTypes, getAllUserFavorites } from "../components/ApiManager"


export const MyFavorites = () => {
//get state of user favorites & expand 
    const [ allUserFavorites, setAllUserFavorites ] = useState([])
    const [ coachTypes, setCoachTypes ] = useState([])

    const userId = useParams()
    const history = useHistory()

    const userFavoriteState = () =>{
        getAllUserFavorites()
        .then((data)=>{
            setAllUserFavorites(data)
        })
    }
    useEffect(
        () =>{
            userFavoriteState()
        },
        []
    ) 

    useEffect(
        () =>{
            getAllCoachTypes()
            .then((data)=>{
                setCoachTypes(data)
            })
        },
        []
    )

    const deleteFavorite = (id) => {
        return DeleteMyFavorite(id)
        .then((data) => {
            userFavoriteState(data)
        })
    }


    return(
        <>
        <h2>My Favorites</h2>
        {
            allUserFavorites.map(
                (userFavorite)=>{
                    if(userFavorite.userId === parseInt(localStorage.getItem("in_my_lane_coach"))){
                        const foundCoachTypeName = coachTypes.find(coachTypeObj => {
                            return(coachTypeObj.id === userFavorite.userProfile.coachTypeId)
                        })
                        return <div className="allCards">
                            <div className="card">
                                <img className="card-img-top" src={userFavorite.userProfile.imageURL} alt="Profile Picture" />
                                <div className="card-body">
                                    <h3 className="card-title">
                                        <Link className="linkMyWay" to= {`/connect/${userFavorite.userProfile.id}`}>{userFavorite.userProfile.firstName} {userFavorite.userProfile.lastName}
                                        </Link>
                                    </h3>
                                    <h5>{foundCoachTypeName?.name}</h5>
                                    <p>✉️ {userFavorite.userProfile.email}</p>
                                    <p>Taking New Clients? {userFavorite.userProfile.takingClients? "Yes": "No"}</p>
                                    <button onClick={()=>{
                                        deleteFavorite(userFavorite.id)
                                    }}>Remove Favorite</button>
                                </div>
                            </div>
                        </div>
                    }
                }
            )
        }
        </>
    )

}

//expand user profile, do a find method on userProfile.coachTypeId 
//match coachTypeId to coachType.id 