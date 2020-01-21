import React from 'react'

export default function ConfirmDelete(props) {
    return <div>
        <p>Confirm Delete</p>
        <button onClick={props.modalAction}>Confirm</button>
        <button onClick={()=>props.togglePortal('confirmDelete')}>Cancel</button>
    </div>
}