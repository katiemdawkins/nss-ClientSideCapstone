import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
             <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
             <li className="navbar__item">
                <Link className="navbar__link" to="/myProfile">My Profile</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/connect">Connect</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/eventsCourses">Events + Courses</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("in_my_lane_coach")
                        }
                    }>
                        Log Out
                </Link>
            </li>
        </ul>
    )
}