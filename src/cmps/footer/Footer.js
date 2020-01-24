import React from 'react'
import { Link } from 'react-router-dom';

import './_Footer.scss'

export default function Footer(props) {
    return (
        <div className="footer-container">
            <img className="logo-footer" width="10"alt="logo" src="/logo.png" />
            <small className="rights">© 2020, GameIn, Inc. All rights reserved</small>
            <div>
                <Link>About</Link>
            </div>
        </div>
    )
}