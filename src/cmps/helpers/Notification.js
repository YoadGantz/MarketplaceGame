import React from 'react'
import './_Notification.scss'

export default function Notification(props) {
    return <div className="notification">
        <p>{props.modalTxt}</p>
    </div>
}