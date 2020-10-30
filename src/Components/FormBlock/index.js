import React from 'react';

export default function FormBlock(props) {
    console.log(props.onChange1);
    let {onChange1} = props;
    let teste = {onChange1};
    let {onChange2} = props;
    let teste2 = {onChange2};
    return (
        <div className="info-block">
            <div className="input-area">
                <label htmlFor="company_name" onChange={teste}>{props.label1}:</label>
                <br />
                <input type={props.typeInput1} />
            </div>
            <div className="input-area">
                <label htmlFor="document" onChange={teste2}>{props.label2}:</label>
                <br />
                <input type={props.typeInput2} />
            </div>
        </div>
    )
}