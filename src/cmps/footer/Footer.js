import React from 'react'
import { Link } from 'react-router-dom';

import './_Footer.scss'

export default function Footer(props) {
    return (
        <div className="footer-container totally-center flex column">
            <img className="logo-footer" width="10"alt="logo" src="/logo.png" />
            <small className="rights">© 2020, <span className="name">GameIn</span> Inc. All rights reserved</small>
            <div>
                <Link to="/about">About us</Link>
            </div>
        </div>
    )
}