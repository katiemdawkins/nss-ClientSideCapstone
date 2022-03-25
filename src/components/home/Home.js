import React from "react";
import "./Home.css"

export const HomePage = () =>{
    return (
        <>
        <div className="homeContent">
            <div className="container2">
            <img className="logo" src="https://res.cloudinary.com/katiedawkins/image/upload/v1648147583/InMyLaneLogo_tom0be.png" alt="in my lane logo"/>
            </div>
            <div className="container2">
                <h1 className="homeHeader">Welcome to In My Lane</h1>
                <h3 className="homeSmallHeader">A referral network for non-diet professionals.</h3>
                <p>Connect with like minded personal trainers, physical therapists, mental health therapists, registered dieticians, and yoga instructors.</p>
            </div>
        </div>
        </>
    )
}