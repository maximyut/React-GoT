import React from 'react';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt="error" style={
                {width: 100 + '%'}
            }></img>
            <span>Something goes wrong :(</span>
        </>
    )
}
export default ErrorMessage;