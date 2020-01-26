import React from 'react';
import './_InfoCard.scss';

export default function InfoCard(props) {
    return (
        <div className='info-card flex column align-center'>
            <p>
                {props.children}
            </p>
            <p className="data">
                {props.children.includes('Earned') && '$'}{props.data}
            </p>
        </div>)

}
