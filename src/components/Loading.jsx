import React from "react";

import {Spinner} from 'reactstrap';


const Loading = () => {

    return (
        <div className="loading">
            <Spinner animation="border" variant="primary" />
        </div>
    );
}


export default Loading;