import React, { useState,useEffect } from "react";
import axios from "axios";
import {Spinner} from 'reactstrap';


const Loading = ({loading,mandarina}) => {

    return (
        <div className="loading">
            <Spinner animation="border" variant="primary" />

            <h1>{loading}</h1>
            <h1>{mandarina}</h1>
        </div>
    );
}


export default Loading;