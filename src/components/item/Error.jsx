import React from "react";

const Error = ({errors}) => {    
    return (
        <div className="error">
        {
            errors === undefined 
            ? null
            : <label style={{ color:"red" }} >{errors}</label>             

        }
        </div>

    );
}

export default Error;