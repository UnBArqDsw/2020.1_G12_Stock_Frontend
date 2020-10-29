import React from 'react';
import './styles.css';

export default function FormBlock(props) {

    return (
        <div className="info-block">
            <div className="input-area">
                <label htmlFor="company_name">{props.label1}:</label>
                <br />
                <input type={props.typeInput1} />
            </div>
            <div className="input-area">
                <label htmlFor="document">{props.label2}:</label>
                <br />
                <input type={props.typeInput2} />
            </div>
        </div>
    )
}