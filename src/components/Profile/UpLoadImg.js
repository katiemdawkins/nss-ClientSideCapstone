import React, {useState} from "react";

export default function UploadImages ({obj, update}) {
    
    const [ uploadedImage, setUploadedImage ] = useState("")

    const checkUploadResult = (resultEvent) =>{
         if(resultEvent.event === "success") {
             const copy = { ...obj}
             copy.imageURL = resultEvent.info.secure_url
             update(copy)
             setUploadedImage(`${resultEvent.info.original_filename}.${resultEvent.info.format}`)
         }
    }

    const showWidget = (e) => {
        e.preventDefault()
        let widget = window.cloudinary.createUploadWidget({cloudName:"katiedawkins", uploadPreset: "t9f2jdoo"}, (error, result) => {checkUploadResult(result)})
        widget.open()
    }

    return (
        <>
            <button id="btn" onClick={showWidget}>Upload a Profile Picture</button>
            <p>{uploadedImage}</p>
        </>
    )
}